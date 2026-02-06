import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/core/api/supabase";

export default function AuthListener() {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for Supabase auth state changes and route accordingly.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        // Redirect authenticated users to the admin dashboard.
        navigate("/admin");
      }

      if (event === "SIGNED_OUT") {
        // Redirect signed-out users back to the login page.
        navigate("/login");
      }
    });

    // Prevent memory leaks by cleaning up the auth listener on unmount.
    return () => subscription.unsubscribe();
  }, [navigate]);

  // This component renders no UI; it only handles auth navigation side effects.
  return null;
}
