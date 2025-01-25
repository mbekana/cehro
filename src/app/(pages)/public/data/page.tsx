'use client';

import React, { useEffect, useState } from 'react';

// Define a type for the post structure
interface Post {
  id: string;
  title: string;
  description: string;
  image?: string | null;
}

const NewsCard = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem("blogPosts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts([]); // Set an empty array if no posts are found
    }
  }, []);

  return (
    <>
      <div className="h-full flex flex-col w-full bg-white justify-center items-center py-8">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={index}
              className="flex w-[1000px] h-[500px] bg-black justify-center items-center mb-8 pr-4 pl-4 rounded-lg"
            >
              {/* Image Section */}
              <div className="w-1/3 h-full bg-black flex justify-center items-center">
                {/* Example of using a local image from the public folder */}
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: "300px", marginTop: "10px" }}
                  />
                ) : (
                  <div className="text-gray-500">No image available</div>
                )}
              </div>

              {/* Content Section */}
              <div className="w-2/3 h-full flex flex-col justify-center bg-black ml-10">
                <h2 className="text-2xl font-bold text-white mb-4">{post.title}</h2>
                <p className="text-gray-300 text-lg mb-6">{post.description}</p>
                <div className="mb-6">
                  <span className="inline-block bg-gray-600 rounded-full px-4 py-2 text-sm font-semibold text-gray-300 mr-2 mb-1">
                    TAGS: {post.id}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="f-full text-white">No posts found.</p>
        )}
      </div>
    </>
  );
};

export default NewsCard;
