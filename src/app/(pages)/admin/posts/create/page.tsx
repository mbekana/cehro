'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";

type Post = {
  // id: number; 
  description: string;
  title: string;
  image: string;
};

const PostForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  // const router = useRouter();

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

    const newPost: Post = { title, description, image };
    const savedPosts: Post[] = JSON.parse(localStorage.getItem("blogPosts") || "[]");
    savedPosts.push(newPost);
    localStorage.setItem("blogPosts", JSON.stringify(savedPosts));

    alert("Blog post published!");
  };


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
                text={"Save Post"}
                size="large"
                elevation={4}
                borderRadius={3}
                // disabled={loading}
                // onClick={handleSubmit}
              />
            </div>
          </form>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default PostForm;
