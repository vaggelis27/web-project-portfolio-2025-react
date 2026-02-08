import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/core/api/supabase";

const PHOTOS_QUERY_TIMEOUT_MS = 12000;

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

export function usePhotos(category) {
  /* STATE MANAGEMENT */
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getPublicUrl = (imagePath) => {
    if (typeof imagePath !== "string" || imagePath.trim() === "") return "";
    return supabase.storage.from("images").getPublicUrl(imagePath.trim()).data
      .publicUrl;
  };

  /* FETCH PHOTOS FROM SUPABASE FOR CATEGORY */
  useEffect(() => {
    let isCurrent = true;
    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: supabaseError } = await withTimeout(
          supabase
            .from("photos")
            .select("id, image_path, alt")
            .eq("category", category),
          PHOTOS_QUERY_TIMEOUT_MS,
          "Photos request timed out.",
        );

        if (!isCurrent) return;

        if (supabaseError) {
          setError("Failed to load");
          setPhotos([]);
          return;
        }

        const withUrls = (data ?? []).map((img) => ({
          ...img,
          url: getPublicUrl(img.image_path),
        }));
        setPhotos(withUrls);
      } catch (err) {
        if (isCurrent) {
          const isTimeout =
            err instanceof Error && err.message.includes("timed out");
          setError(isTimeout ? "Loading timed out. Please refresh." : "Failed to load");
          setPhotos([]);
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    fetchPhotos();

    return () => {
      isCurrent = false;
    };
  }, [category]);
  const processedPhotos = useMemo(() => {
    return photos;
  }, [photos]);

  return { photos, loading, error, processedPhotos };
}
