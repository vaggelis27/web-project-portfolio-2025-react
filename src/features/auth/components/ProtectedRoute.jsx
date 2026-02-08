import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/core/api/supabase";

export function ProtectedRoute({ children }) {
  // null means "checked and not authenticated", undefined means "still checking"
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    let isMounted = true;

    const initSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (isMounted) {
          setSession(session ?? null);
        }
      } catch (err) {
        console.error("Auth session check failed:", err.message);
        if (isMounted) {
          setSession(null);
        }
      }
    };

    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setSession(session ?? null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // While waiting for Supabase session check
  if (session === undefined) return <p>Loading...</p>;

  // If no active session, redirect to login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated session -> render protected content
  return children;
}

export default ProtectedRoute;
