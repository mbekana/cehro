'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import Cookies from "js-cookie";
import Toast from "@/app/components/UI/Toast";

const PostForm = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
 const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    position: "top-right";
  } | null>(null);
  useEffect(() => {
    const user = Cookies.get("userData") ? JSON.parse(Cookies.get("userData")!) : null;
    setUserData(user);
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(file);
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !body || !image || !tag) {
      setToast({
        message: "Please fill all fields and upload an image.",
        type: "error",
        position: "top-right",
      });
      return;
    }

    setLoading(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("tag", tag);
      formData.append("image", image);
      formData.append("postedBy", userData?.id);

      const response = await fetch(`${apiUrl}/api/v1/posts/register`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred while submitting the post.");
      }

      setTitle("");
      setBody("");
      setTag("");
      setImage(null);
      setImagePreview(null);

      setToast({
        message: "Blog post published successfully!",
        type: "success",
        position: "top-right",
      });
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : "Something went wrong.",
        type: "error",
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
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
                  label="Body"
                  placeholder="Enter body content"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  name="body"
                  borderRadius={3}
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Tag"
                  placeholder="Enter a tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  name="tag"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Media Upload
                </label>
                <div className="mt-1">
                  {imagePreview && (
                    <div className="mb-4">
                      <img
                        src={imagePreview}
                        alt="Selected preview"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
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
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                color="primary"
                text={loading ? "Publishing..." : "Save Post"}
                size="large"
                elevation={4}
                borderRadius={3}
                disabled={loading}
              />
            </div>
          </form>
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
    </div>
  );
};

export default PostForm;
