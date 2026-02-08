import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/core/api/supabase";

export default function AuthListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        // 1. Ρωτάμε τη βάση για τον ρόλο του χρήστη
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Σφάλμα προφίλ:", error.message);
          return;
        }

        // 2. Ανακατεύθυνση βάσει ρόλου
        if (profile?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/"); // Ο απλός χρήστης πάει στην αρχική
        }
      }

      if (event === "SIGNED_OUT") {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return null;
}
