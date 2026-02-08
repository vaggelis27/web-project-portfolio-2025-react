import { Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/core/api/supabase";

const AUTH_GUARD_TIMEOUT_MS = 10000;

const withTimeout = (promise, ms, message) =>
  new Promise((resolve, reject) => {
    const timerId = setTimeout(() => reject(new Error(message)), ms);
    promise.then(
      (value) => {
        clearTimeout(timerId);
        resolve(value);
      },
      (error) => {
        clearTimeout(timerId);
        reject(error);
      },
    );
  });

export function ProtectedRoute({ children }) {
  // undefined means "still checking"; null means "checked and unauthenticated"
  const [session, setSession] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const latestCheckIdRef = useRef(0);

  useEffect(() => {
    let isMounted = true;
    const getErrorMessage = (err) =>
      err instanceof Error ? err.message : String(err);

    const resolveAccess = async (currentSession) => {
      const checkId = ++latestCheckIdRef.current;
      if (!isMounted) return;

      if (!currentSession) {
        setSession(null);
        setIsAdmin(false);
        setCheckingRole(false);
        return;
      }

      setSession(currentSession);
      setCheckingRole(true);

      try {
        const { data: profile, error: roleError } = await withTimeout(
          supabase
            .from("profiles")
            .select("role")
            .eq("id", currentSession.user.id)
            .maybeSingle(),
          AUTH_GUARD_TIMEOUT_MS,
          "Role check timed out.",
        );

        if (!isMounted || checkId !== latestCheckIdRef.current) return;

        if (roleError) {
          throw roleError;
        }

        setIsAdmin(profile?.role === "admin");
      } catch (err) {
        if (isMounted && checkId === latestCheckIdRef.current) {
          console.error("Role check failed:", getErrorMessage(err));
          setIsAdmin(false);
        }
      } finally {
        if (isMounted && checkId === latestCheckIdRef.current) {
          setCheckingRole(false);
        }
      }
    };

    const initSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await withTimeout(
          supabase.auth.getSession(),
          AUTH_GUARD_TIMEOUT_MS,
          "Session check timed out.",
        );

        if (error) {
          throw error;
        }

        await resolveAccess(session ?? null);
      } catch (err) {
        console.error("Auth session check failed:", getErrorMessage(err));
        await resolveAccess(null);
      }
    };

    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      resolveAccess(session ?? null);
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // While waiting for Supabase session and role check.
  if (session === undefined || checkingRole) return <p>Loading...</p>;

  // If no active session, redirect to login.
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated but not admin -> return to public home.
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Authenticated admin session -> render protected content.
  return children;
}

export default ProtectedRoute;
