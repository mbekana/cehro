'use client';

import React, { useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";

type News = {
  title: string;
  description: string;
  images: File | null;
};

const NewsForm = () => {
  
  const [formData, setFormData] = useState<News>({
    title: "",
    description: "",
    images: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Preparing form data to be sent
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("description", formData.description);
    if (formData.images) formDataToSubmit.append("images", formData.images);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/news`, {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        // Handle successful response if necessary
        alert("News submitted successfully!");
      } else {
        setError("Failed to save news");
      }
    } catch (err) {
      setError(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

      setFormData((prevData) => ({
        ...prevData,
        images: file, // Store the selected image
      }));
    }
  };

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaCalendar />}
        title={"Create News"}
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="News Form"
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
                  label="News Title"
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
                    accept="image/jpeg, image/png, image/jpg" // Restrict file type to images
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
                text={loading ? "Saving..." : "Save News"}
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

export default NewsForm;
