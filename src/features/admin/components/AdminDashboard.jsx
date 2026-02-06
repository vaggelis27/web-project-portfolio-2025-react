import React, { useEffect, useState, useRef } from "react";
import { supabase } from "@/core/api/supabase";
import { usePhotos } from "@/hooks/usePhotos.js";

export default function AdminDashboard() {
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file
  const [category, setCategory] = useState("nature"); // State to hold the current category for upload
  const { photos, loading } = usePhotos(category); // Custom hook to fetch photos based on the selected category
  const [managedPhotos, setManagedPhotos] = useState([]); // Local state for instant UI updates without page reload
  const [isUploading, setIsUploading] = useState(false); // State to handle upload loading status
  const fileInputRef = useRef(null); // Ref to reset the file input field

  useEffect(() => {
    setManagedPhotos(photos);
  }, [photos]);

  // Function to handle uploading a new photo
  const handleUpload = async () => {
    if (!selectedFile || isUploading) return;

    setIsUploading(true);
    let filePath = "";

    try {
      const unique = crypto.randomUUID(); // unique per upload
      filePath = `${category}/${Date.now()}_${unique}_${selectedFile.name}`;

      // Upload the file to Supabase Storage
      const { error: storageError } = await supabase.storage
        .from("images")
        .upload(filePath, selectedFile);

      if (storageError) throw storageError;

      // Insert the file path into the database
      // Αντικατάστησε το .insert(...) με αυτό:
      const { data: insertedPhoto, error: dbError } = await supabase
        .from("photos")
        .upsert(
          [
            {
              image_path: filePath,
              category: category,
              alt: selectedFile.name,
            },
          ],
          { onConflict: "image_path" },
        ) // Δήλωση της στήλης που έχει το Unique Constraint
        .select("id, image_path, alt")
        .single();

      if (dbError) {
        await supabase.storage.from("images").remove([filePath]);
        throw dbError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      setManagedPhotos((prev) => [
        ...prev,
        { ...insertedPhoto, url: publicUrl },
      ]);

      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      alert("The photo was uploaded successfully!");
    } catch (err) {
      alert("Upload Error: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Function to handle deleting a photo
  const handleDelete = async (photoId, imagePath) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return; // Prompt user for confirmation

    try {
      // Delete the photo from the database first (source of truth for dashboard listing).
      const { data, error: dbError } = await supabase
        .from("photos")
        .delete()
        .eq("id", photoId)
        .select(); // Request the deleted record to be returned

      if (dbError) throw dbError;

      // If data is empty, it means nothing was deleted (e.g., due to RLS)
      if (!data || data.length === 0) {
        throw new Error(
          "Deletion failed. Check permissions (RLS) or if the photo exists.",
        );
      }

      setManagedPhotos((prev) =>
        prev.filter((photo) => String(photo.id) !== String(photoId)),
      );

      // Try to delete the underlying file. If this fails, keep UI updated and inform user.
      const { error: storageError } = await supabase.storage
        .from("images")
        .remove([imagePath]);

      if (storageError) {
        alert(
          `Photo removed from dashboard, but file cleanup failed: ${storageError.message}`,
        );
        return;
      }

      alert("The photo was deleted successfully!"); // Show success message to the user
    } catch (err) {
      alert("Delete Error: " + err.message); // Catch and display error if something goes wrong
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Upload Form */}
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-lg mb-4">Upload New Photo</h2>
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])} // Allow user to select a file
          className="mb-4 block w-full"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)} // Allow user to select a category
          className="mb-4 p-2 border rounded block w-full"
        >
          <option value="nature">Nature</option>
          <option value="milky_way">Milky Way</option>
          <option value="portraits">Portraits</option>
        </select>
        <button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading} // Disable button if no file is selected or uploading
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* List of Photos for Management */}
      <h2 className="text-xl mb-4">Existing Photos ({category})</h2>
      {loading ? (
        <p>Loading...</p> // Show a loading message while fetching photos
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {managedPhotos.map((photo) => (
            <div
              key={photo.id}
              className="border rounded p-2 bg-white shadow-sm"
            >
              <img
                src={photo.url}
                alt={photo.alt} // Display the alternative text for the photo
                className="h-32 w-full object-cover rounded"
              />
              <button
                onClick={() => handleDelete(photo.id, photo.image_path)} // Allow user to delete a photo
                className="mt-2 w-full bg-red-500 text-white text-sm py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
