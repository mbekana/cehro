"use client";

import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { useParams } from "next/navigation";

type Post = {
  id: any;
  title: string;
  body: string;
  tag: string;
  image: string;
};

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPostDetailData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${apiUrl}/api/v1/posts/${id}`, {
            method: "GET",
          });

          if (response.ok) {
            const data = await response.json();
            setPost(data.data); // Assuming the image is available in data.data.images
          } else {
            console.error("Post not found");
            setError("Post not found");
          }
        } catch (error) {
          console.error("Error fetching post data", error);
          setError("Failed to fetch post details.");
        } finally {
          setLoading(false);
        }
      };

      fetchPostDetailData();
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
      icon={<FaArrowLeft />}
      title="Post Details"
      borderColor="border-primary"
      borderThickness="border-b-4"
      shouldGoBack={true}
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
              <h3 className="text-lg font-semibold text-gray-700">
                Post Title
              </h3>
              <p className="text-gray-600">{post.title}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Body</h3>
              <p className="text-gray-600">{post.body}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Tag</h3>
              <p className="text-gray-600">{post.tag}</p>
            </div>

            {post.image && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Media</h3>
                <img
                  src={post.image}
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
