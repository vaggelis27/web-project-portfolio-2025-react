import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/core/api/supabase";

const AUTH_LISTENER_TIMEOUT_MS = 10000;

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

export default function AuthListener() {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");

  const routeByRole = useCallback(
    async (session) => {
      const { data: profile, error } = await withTimeout(
        supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .maybeSingle(),
        AUTH_LISTENER_TIMEOUT_MS,
        "Profile role check timed out.",
      );

      if (error) {
        throw error;
      }

      if (profile?.role === "admin") {
        navigate("/admin");
        return;
      }

      navigate("/");
    },
    [navigate],
  );

  const retryRoleCheck = useCallback(async () => {
    setAuthError("");
    const {
      data: { session },
      error,
    } = await withTimeout(
      supabase.auth.getSession(),
      AUTH_LISTENER_TIMEOUT_MS,
      "Session check timed out.",
    );

    if (error || !session) {
      navigate("/login");
      return;
    }

    try {
      await routeByRole(session);
    } catch (err) {
      console.error("Retry role check failed:", err.message);
      setAuthError(
        "Could not verify your profile role. Please retry or sign out and sign in again.",
      );
    }
  }, [navigate, routeByRole]);

  useEffect(() => {
    let isMounted = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session) {
        try {
          if (isMounted) setAuthError("");
          await routeByRole(session);
        } catch (err) {
          console.error("Profile role check failed:", err.message);
          if (isMounted) {
            setAuthError(
              "Could not verify your profile role. Please retry or sign out and sign in again.",
            );
          }
        }
      }

      if (event === "SIGNED_OUT") {
        if (isMounted) setAuthError("");
        navigate("/login");
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, routeByRole]);

  if (!authError) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 shadow-lg">
      <p>{authError}</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={retryRoleCheck}
          className="rounded bg-amber-600 px-3 py-1.5 text-white hover:bg-amber-700"
        >
          Retry
        </button>
        <button
          type="button"
          onClick={() => supabase.auth.signOut()}
          className="rounded border border-amber-700 px-3 py-1.5 text-amber-900 hover:bg-amber-100"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
