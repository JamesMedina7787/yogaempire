const MediaUploader = ({ onUpload }) => {
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
      onUpload(data.url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload media.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Upload Media</h2>
      <input type="file" onChange={handleUpload} />
    </div>
  );
};

export default MediaUploader;
