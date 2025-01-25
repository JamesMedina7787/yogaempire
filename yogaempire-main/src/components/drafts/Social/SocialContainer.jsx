import React, { useEffect, useState } from "react";

const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/instagram/posts`);


const SocialContainer = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=${process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN}`
        );
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error("Failed to fetch Instagram posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Instagram Feed</h2>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="post-container">
            <img
              src={post.media_url}
              alt={post.caption}
              className="rounded-lg shadow-lg"
            />
            <p className="text-sm mt-2">{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialContainer;
