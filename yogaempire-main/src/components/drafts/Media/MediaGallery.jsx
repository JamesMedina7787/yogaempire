import React, { useEffect, useState } from "react";

const MediaGallery = () => {
  const [mediaList, setMediaList] = useState([]);

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
      }
    };

    fetchMedia();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Media Gallery</h2>
      <div className="grid grid-cols-3 gap-4">
        {mediaList.map((item) => (
          <img
            key={item.id}
            src={item.url}
            alt={item.title}
            className="rounded-lg shadow-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;
