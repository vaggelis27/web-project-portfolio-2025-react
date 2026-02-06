import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/core/api/supabase";

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined); // undefined για να ξέρουμε ότι φορτώνει

  useEffect(() => {
    // Έλεγχος αν υπάρχει ήδη session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Ακρόαση για αλλαγές
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Όσο περιμένουμε το Supabase να απαντήσει
  if (session === undefined) return <p>Loading...</p>;

  // Αν δεν υπάρχει session, στείλε τον στο login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Αν υπάρχει, δείξε τη σελίδα (children)
  return children;
}