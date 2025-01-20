'use client';

import React, { useEffect, useState } from 'react';
import { FaCalendar } from 'react-icons/fa';
import BoxWrapper from '@/app/components/UI/BoxWrapper';
import Card from '@/app/components/UI/Card';
import Divider from '@/app/components/UI/Divider';
import { useParams } from 'next/navigation';

type Post = {
  id: any;
  title: string;
  description: string;
  images: any;
};

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // Check if the post item is already in localStorage
      const storedPosts = localStorage.getItem('posts');
      if (storedPosts) {
        const posts = JSON.parse(storedPosts);
        const selectedPost = posts.find((post: Post) => post.id == id);
        
        if (selectedPost) {
          setPost(selectedPost); // Use cached data from localStorage
          setLoading(false); // Stop loading since we have data
        } else {
          setError('Post not found');
          setLoading(false);
        }
      } else {
        const fetchPostsDetails = async () => {
          setLoading(true);
          try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/posts`);
            if (response.ok) {
              const data = await response.json();
              // Store all posts in localStorage
              localStorage.setItem('posts', JSON.stringify(data));

              // Find the post by id from the fetched data
              const selectedPost = data.find((post: Post) => post.id == id);
              
              if (selectedPost) {
                setPost(selectedPost); // Set the post from the API
              } else {
                setError('Post not found');
              }
            } else {
              setError('Failed to fetch posts');
            }
          } catch (err) {
            setError(`Error fetching posts: ${err}`);
          } finally {
            setLoading(false);
          }
        };
        fetchPostsDetails();
      }
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <BoxWrapper
      icon={<FaCalendar />}
      title="Post Details"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <Card
        title="Post Information"
        borderColor="border-red-300"
        borderThickness="border-1"
        bgColor="bg-grey-100"
      >
        <Divider
          borderColor="border-gray-400"
          borderThickness="border-t-2"
          marginTop="mt-1"
          marginBottom="mb-6"
        />
        
        {post && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Post ID</h3>
              <p className="text-gray-600">{post.id}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Post Title</h3>
              <p className="text-gray-600">{post.title}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Description</h3>
              <p className="text-gray-600">{post.description}</p>
            </div>
            {post.images && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Media</h3>
                <img
                  src={post.images} // Assuming 'images' contains a URL or path
                  alt={post.title}
                  className="w-full max-w-md"
                />
              </div>
            )}
          </div>
        )}
      </Card>
    </BoxWrapper>
  );
};

export default PostDetail;
