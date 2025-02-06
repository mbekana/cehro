'use client';

import React, { useEffect, useState } from 'react';


const PostFeeds = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setStatus('APPROVED')

        const response = await fetch(
          `${apiUrl}/api/v1/posts/all?status=${status}&page=${pagination.page}&limit=${pagination.limit}`
        );
        if (response.ok) {
          const data = await response.json();
          setPosts(data.data);
          console.log("Data ", data.data)
          setPagination(data.pagination);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [status, pagination.page, pagination.limit]);

  return (
    <div className="h-full flex flex-col w-full bg-white justify-center items-center py-8">
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : posts.length > 0 ? (
        posts.map((post, index) => (
          <div
            key={index}
            className="flex w-[1000px] h-[500px] bg-black justify-center items-center mb-8 pr-4 pl-4 rounded-lg"
          >
            <div className="w-1/3 h-full bg-black flex justify-center items-center">
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

            <div className="w-2/3 h-full flex flex-col justify-center bg-black ml-10">
              <h2 className="text-2xl font-bold text-white mb-4">{post.title}</h2>
              <p className="text-gray-300 text-lg mb-6">{post.body}</p>
              <div className="mb-6">
                <span className="inline-block bg-gray-600 rounded-full px-4 py-2 text-sm font-semibold text-gray-300 mr-2 mb-1">
                  TAGS: {post.tag}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">No posts found.</p>
      )}
    </div>
  );
};

export default PostFeeds;