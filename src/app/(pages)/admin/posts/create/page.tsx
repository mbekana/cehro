'use client';

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";

type Post = {
  id: number; // Add ID to uniquely identify posts
  title: string;
  description: string;
  images: any;
};

const PostForm = () => {
  const [formData, setFormData] = useState<Post>({
    id: 0, // Default ID, will be set after calculating the next available ID
    title: "",
    description: "",
    images: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }, [posts]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      // Calculate the next ID based on existing posts
      const newId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;

      // Create a new post object with the calculated ID
      const newPost = { ...formData, id: newId };

      // Update the posts array with the new post
      setPosts((prevPosts) => {
        const updatedPosts = [...prevPosts, newPost];
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
        return updatedPosts;
      });

      // Reset the form data after successful submission
      setFormData({ id: 0, title: "", description: "", images: null });
      setError(null);
    } catch (err) {
      setError("Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "file" | "media"
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const maxFileSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxFileSize) {
        setError("File size exceeds the maximum limit of 5 MB.");
        return;
      }

      const extension = file.name.split(".").pop()?.toLowerCase();
      const allowedImageExtensions = ["jpg", "png", "jpeg"];

      if (field === "media" && !allowedImageExtensions.includes(extension)) {
        setError("Invalid file type. Please upload a valid image.");
        return;
      }

      setError(null);

      // Set the image to formData
      setFormData((prevData) => ({
        ...prevData,
        [field]: file,
      }));
    }
  };

  // Generate image preview URL
  const imagePreview = formData.images
    ? URL.createObjectURL(formData.images)
    : null;

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaCalendar />}
        title={"Create Post"}
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Post Form"
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
                  {formData.images && (
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>Selected file:</strong> {formData.images.name}
                    </div>
                  )}
                  <label
                    htmlFor="media"
                    className="inline-block cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Select Media
                  </label>
                  <input
                    id="media"
                    type="file"
                    onChange={(e) => handleFileChange(e, "media")}
                    className="hidden"
                  />
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
                onClick={handleSubmit}
              />
            </div>
          </form>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default PostForm;
