import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/core/api/supabase";

const SESSION_GUARD_TIMEOUT_MS = 10000;

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

export function SessionRoute({ children }) {
  // undefined => still checking, null => unauthenticated
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    let isMounted = true;

    const initSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await withTimeout(
          supabase.auth.getSession(),
          SESSION_GUARD_TIMEOUT_MS,
          "Session check timed out.",
        );

        if (error) {
          throw error;
        }

        if (isMounted) {
          setSession(session ?? null);
        }
      } catch (err) {
        console.error(
          "SessionRoute session check failed:",
          err instanceof Error ? err.message : String(err),
        );
        if (isMounted) {
          setSession(null);
        }
      }
    };

    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isMounted) {
        setSession(nextSession ?? null);
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  if (session === undefined) return <p>Loading...</p>;

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default SessionRoute;
