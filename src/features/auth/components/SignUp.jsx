const handleSignUp = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // 1. Δημιουργία χρήστη στο Authentication
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // 2. Αν η εγγραφή πέτυχε, δημιουργούμε το προφίλ του στον πίνακα 'profiles'
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: data.user.id, // Το ID που του έδωσε το Auth
          full_name: evangelos_user, // Το state που θα κρατάει το όνομα
          role: "user", // Εδώ ορίζουμε ότι είναι απλός χρήστης
        },
      ]);

      if (profileError) {
        console.error("Error creating profile:", profileError);
      } else {
        alert("Η εγγραφή ολοκληρώθηκε! Τώρα μπορείς να συνδεθείς.");
        navigate("/login");
      }
    }
  } catch (err) {
    console.error("Critical error:", err);
  } finally {
    setLoading(false);
  }
};
