'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";

type Post = {
  id: number;  // Ensure each post has a unique ID
  description: string;
  title: string;
  image: string;
};

const PostForm = ({ postId }: { postId?: number }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (postId !== undefined) {
      const savedPosts: Post[] = JSON.parse(localStorage.getItem("blogPosts") || "[]");
      const postToEdit = savedPosts.find(post => post.id === postId);

      if (postToEdit) {
        setTitle(postToEdit.title);
        setDescription(postToEdit.description);
        setImage(postToEdit.image);
      }
    }
  }, [postId]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string); // Store image as Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = (e: FormEvent) => {
    e.preventDefault();

    if (!title || !description || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const updatedPost: Post = { id: postId ?? Date.now(), title, description, image }; // Generate new ID if editing new post

    const savedPosts: Post[] = JSON.parse(localStorage.getItem("blogPosts") || "[]");

    if (postId) {
      // Update existing post
      const postIndex = savedPosts.findIndex(post => post.id === postId);
      if (postIndex > -1) {
        savedPosts[postIndex] = updatedPost;
      }
    } else {
      // Add new post
      savedPosts.push(updatedPost);
    }

    localStorage.setItem("blogPosts", JSON.stringify(savedPosts));
    alert(postId ? "Post updated!" : "Blog post published!");
  };

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaCalendar />}
        title={postId ? "Update Post" : "Create Post"}
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title={postId ? "Edit Post Form" : "Post Form"}
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

          <form className="space-y-6" onSubmit={handlePost}>
            <div className="flex flex-col space-y-4">
              <div>
                <Input
                  type="text"
                  label="Post Title"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  type="textarea"
                  label="Description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  {image && (
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>Selected file:</strong> 
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
                    onChange={(e) => handleImageChange(e)}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                color="primary"
                text={postId ? "Update Post" : "Save Post"}
                size="large"
                elevation={4}
                borderRadius={3}
              />
            </div>
          </form>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default PostForm;
