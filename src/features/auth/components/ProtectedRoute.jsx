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

const getErrorMessage = (err) =>
  err instanceof Error ? err.message : String(err);

export function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined);
  const [role, setRole] = useState(null);
  const [checkingRole, setCheckingRole] = useState(true);
  const latestCheckIdRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    const resolveAccess = async (currentSession) => {
      const checkId = ++latestCheckIdRef.current;
      if (!isMounted) return;

      if (!currentSession) {
        setSession(null);
        setRole(null);
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

        setRole(profile?.role ?? null);
      } catch (err) {
        if (isMounted && checkId === latestCheckIdRef.current) {
          console.error("Role check failed:", getErrorMessage(err));
          setRole(null);
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
          data: { session: currentSession },
          error,
        } = await withTimeout(
          supabase.auth.getSession(),
          AUTH_GUARD_TIMEOUT_MS,
          "Session check timed out.",
        );

        if (error) {
          throw error;
        }

        await resolveAccess(currentSession ?? null);
      } catch (err) {
        console.error("Auth session check failed:", getErrorMessage(err));
        await resolveAccess(null);
      }
    };

    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      resolveAccess(newSession ?? null);
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  if (session === undefined || checkingRole) {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
