import React, { useEffect, useState } from 'react';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=${process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN}`);
        const data = await response.json();
        setPosts(data.data);
      } catch (err) {
        console.error('Error fetching Instagram posts:', err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="instagram-feed">
      <h2 className="text-xl font-semibold mb-4">Instagram Feed</h2>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <img key={post.id} src={post.media_url} alt={post.caption} className="rounded-lg shadow-lg" />
        ))}
      </div>
    </div>
  );
};

export default InstagramFeed;
