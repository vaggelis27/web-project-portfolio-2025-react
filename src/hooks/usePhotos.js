import { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabase";

function usePhotos(category) {
  /* STATE MANAGEMENT */
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* FETCH PHOTOS FROM SUPABASE FOR CATEGORY */
  useEffect(() => {
    let isCurrent = true;
    const fetchPhotos = async () => {
      setLoading(true);
      const { data, error: supabaseError } = await supabase
        .from("photos")
        .select("id, image_path, alt")
        .eq("category", category);

      if (isCurrent) {
        if (supabaseError) {
          setError("Failed to load");
        } else {
          const withUrls = data.map((img) => ({
            ...img,
            url: supabase.storage.from("images").getPublicUrl(img.image_path)
              .data.publicUrl,
          }));
          setPhotos(withUrls);
        }
        setLoading(false);
      }
    };

    fetchPhotos();

    return () => {
      isCurrent = false;
    };
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
