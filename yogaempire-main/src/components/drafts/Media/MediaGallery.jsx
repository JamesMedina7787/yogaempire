import React, { useEffect, useState } from "react";

const MediaGallery = () => {
  const [mediaList, setMediaList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/media`);
        if (!response.ok) {
          throw new Error(`Error fetching media: ${response.statusText}`);
        }
        const data = await response.json();
        setMediaList(data);
      } catch (error) {
        console.error("Failed to fetch media:", error);
        setError("Failed to fetch media. Please try again later.");
      }
    };

    fetchMedia();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">hello
      <h2 className="text-xl font-bold mb-4">Media Gallery</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaList.length === 0 ? (
          <p>No media available.</p>
        ) : (
          mediaList.map((item) => (
            <img
              key={item.id}
              src={item.url || "/default-image.png"}
              alt={item.title}
              className="rounded-lg shadow-lg"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-image.png";
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
