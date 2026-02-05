import React, { useState } from "react"; // Import necessary hooks from React
import { supabase } from "@/core/api/supabase"; // Import Supabase client for API interactions
import { usePhotos } from "@/hooks/usePhotos.js"; // Custom hook to fetch photos by category

export default function AdminDashboard() {
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file
  const [category, setCategory] = useState("nature"); // State to hold the current category for upload
  const { photos, loading } = usePhotos(category); // Custom hook to fetch photos based on the selected category

  // Function to handle uploading a new photo
  const handleUpload = async () => {
    if (!selectedFile) return; // Check if a file is selected

    try {
      const filePath = `${category}/${Date.now()}_${selectedFile.name}`; // Generate a unique path for the uploaded file

      // Upload the file to Supabase Storage
      const { error: storageError } = await supabase.storage
        .from("images")
        .upload(filePath, selectedFile);

      if (storageError) throw storageError; // Throw an error if upload fails

      // Insert the file path into the database
      const { error: dbError } = await supabase.from("photos").insert([
        {
          image_path: filePath,
          category: category,
          alt: selectedFile.name,
        },
      ]);

      if (dbError) throw dbError; // Throw an error if database insertion fails

      alert("The photo was uploaded successfully!"); // Show success message to the user
      window.location.reload(); // Reload the page to update the displayed photos
    } catch (err) {
      alert("Upload Error: " + err.message); // Catch and display error if something goes wrong
    }
  };

  // Function to handle deleting a photo
  const handleDelete = async (photoId, imagePath) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return; // Prompt user for confirmation

    try {
      // Delete the photo from the database
      const { error: dbError } = await supabase
        .from("photos")
        .delete()
        .eq("id", photoId);

      if (dbError) throw dbError; // Throw an error if deletion fails

      // Delete the file from Supabase Storage
      const { error: storageError } = await supabase.storage
        .from("images")
        .remove([imagePath]);

      if (storageError) throw storageError; // Throw an error if file removal fails

      alert("The photo was deleted successfully!"); // Show success message to the user
      window.location.reload(); // Reload the page to update the displayed photos
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
          disabled={!selectedFile} // Disable button if no file is selected
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Upload
        </button>
      </div>

      {/* List of Photos for Management */}
      <h2 className="text-xl mb-4">Existing Photos ({category})</h2>
      {loading ? (
        <p>Loading...</p> // Show a loading message while fetching photos
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
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
