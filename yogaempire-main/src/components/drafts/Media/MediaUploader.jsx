import React, { useState } from "react";

const MediaUploader = () => {
  const [media, setMedia] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("media", file);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/media`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      setMedia(data.url); // Set the uploaded media URL for preview
      alert(`Uploaded successfully: ${data.url}`);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload media.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Media Uploader</h2>
      <input type="file" onChange={handleUpload} />
      {media && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Preview:</h3>
          <img src={media} alt="Uploaded Preview" className="rounded-lg mt-2" />
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
