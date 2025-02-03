"use client";

import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Button from "@/app/components/UI/Button";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import Toast from "@/app/components/UI/Toast";
import { Post } from "@/app/model/Post";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    position: "top-right";
  } | null>(null);

  const handleApprovePost = async () => {
    if (!post) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
      setLoading(true);
      const payload = { ...post, status: "APPROVED" };
      const response = await fetch(`${apiUrl}/api/v1/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
        }),
      });

      if (response.ok) {
        setPost((prevPost) =>
          prevPost ? { ...prevPost, status: "APPROVED" } : prevPost
        );
        setToast({
          message: "Post Approved Successfully",
          type: "success",
          position: "top-right",
        });
      } else {
        console.error("Failed to approve the post");
        setToast({
          message: "Failed to approve the post.",
          type: "error",
          position: "top-right",
        });
      }
    } catch (error) {
      setToast({
        message: `${error.message}`,
        type: "error",
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

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
            setPost(data.data);
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


  return (
    <>
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
                    className="w-full max-w-md "
                  />
                </div>
              )}

              {post.status !== "APPROVED" && (
                <div className="mt-4">
                  <Button
                    color="success"
                    text={loading ? "Approving..." : "Approve Post"}
                    onClick={handleApprovePost}
                    icon={<FaCheck />}
                    size="large"
                  />
                </div>
              )}

              {post.status === "APPROVED" && (
                <div className="text-green-500 font-semibold">
                  This post has been approved.
                </div>
              )}
            </div>
          )}
        </Card>
      </BoxWrapper>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          position={toast.position}
          onClose={() => setToast(null)} 
        />
      )}
    </>
  );
};

export default PostDetail;
