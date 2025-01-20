'use client';

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation";

type Post = {
  id: number; // Add id to uniquely identify posts
  title: string;
  description: string;
  images: File | null;
};

const PostForm = () => {
  const [formData, setFormData] = useState<Post>({
    id: 0,
    title: "",
    description: "",
    images: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const { id } = useParams();


  // Load posts from localStorage when the component mounts
  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Find the post to edit based on the postId passed
  useEffect(() => {
    if (id && posts.length > 0) {
      const postToEdit = posts.find((post) => post.id === Number(id));
      if (postToEdit) {
        setFormData(postToEdit); // Set the form with the post's data
      } else {
        setError("Post not found");
      }
    }
  }, [id, posts]);

  // Save the posts to localStorage whenever posts state changes
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }, [posts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update the post with the matching id
      const updatedPosts = posts.map((post) =>
        post.id === formData.id ? { ...post, ...formData } : post
      );
      setPosts(updatedPosts); // Update the posts state

      setFormData({ id: 0, title: "", description: "", images: null }); // Reset form
      setError(null);
    } catch (err) {
      setError("Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const maxFileSize = 5 * 1024 * 1024; // 5 MB
      if (file.size > maxFileSize) {
        setError("File size exceeds the maximum limit of 5 MB.");
        return;
      }

      const extension = file.name.split(".").pop()?.toLowerCase();
      const allowedImageExtensions = ["jpg", "png", "jpeg"];

      if (!allowedImageExtensions.includes(extension || "")) {
        setError("Invalid file type. Please upload a valid image.");
        return;
      }

      setError(null);

      // Update the form data with the selected file
      setFormData((prevData) => ({
        ...prevData,
        images: file, 
      }));
    }
  };

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaCalendar />}
        title={formData.id ? "Update Post" : "Create Post"}
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title={formData.id ? "Update Post Form" : "Create Post Form"}
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
          
          {error && <div className="text-red-500 mb-4">{error}</div>}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <div>
                <Input
                  type="text"
                  label="Post Title"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={handleChange}
                  name="title"
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  type="textarea"
                  label="Description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleChange}
                  name="description"
                  borderRadius={3}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Media Upload
                </label>
                <div className="mt-1">
                  <label
                    htmlFor="media"
                    className="inline-block cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Select Image
                  </label>
                  <input
                    id="media"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/jpeg, image/png, image/jpg"
                  />
                  {formData.images && (
                    <span className="text-sm text-gray-600 ml-2">
                      {formData.images.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                color="primary"
                text={loading ? "Saving..." : "Save Post"}
                size="large"
                elevation={4}
                borderRadius={3}
                disabled={loading}
              />
            </div>
          </form>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default PostForm;
