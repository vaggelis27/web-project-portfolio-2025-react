import { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabase";

function usePhotos(category) {
  /* STATE MANAGEMENT */
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* FETCH PHOTOS FROM SUPABASE FOR NATURE CATEGORY */
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from("photos")
          .select("id, image_path, alt") // Added id for better keys
          .eq("category", category)
          .order("created_at", { ascending: true });

        if (supabaseError) throw supabaseError;
        setPhotos(data || []);
      } catch (err) {
        console.error("Error fetching nature photos:", err.message);
        setError("Failed to load images.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [category]);

  const processedPhotos = useMemo(() => {
    return photos.map((img) => {
      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(img.image_path.trim());

      return {
        ...img,
        url: data.publicUrl,
      };
    });
  }, [photos]);

  return { photos, loading, error, processedPhotos };
}

export default usePhotos;
