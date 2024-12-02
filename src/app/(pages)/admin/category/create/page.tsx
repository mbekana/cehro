"use client";

import React, { useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";

type RegionFormData = {
  name: string;
  remark: string;
};

const CategoryForm = () => {
  const [formData, setFormData] = useState<RegionFormData>({
    name: "",
    remark: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

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

    // Start submitting process
    setIsSubmitting(true);
    setResponseMessage(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL; // External API URL

      const response = await fetch(`${apiUrl}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      const result = await response.json();
      setResponseMessage(`Category created successfully: ${result.name}`);

      // Reset form after successful submission
      setFormData({
        name: "",
        remark: "",
      });
    } catch (error: any) {
      setResponseMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaCalendar />}
        title="Category Maintenance"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Category Form"
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div>
                <Input
                  type="text"
                  label="Category Name"
                  placeholder="Enter Category Name"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  type="textarea"
                  label="Remark"
                  placeholder="Enter Remark"
                  value={formData.remark}
                  onChange={handleChange}
                  name="remark"
                  borderRadius={3}
                  className="w-full"
                />
              </div>
            </div>
          </form>
        </Card>
      </BoxWrapper>

      {responseMessage && (
        <div className="mt-4 text-center">
          <p className={responseMessage.startsWith("Error") ? "text-red-500" : "text-green-500"}>
            {responseMessage}
          </p>
        </div>
      )}

      <div className="flex justify-end mt-4 mr-24">
        <Button
          color="primary"
          text={isSubmitting ? "Submitting..." : "Save Category"}
          size="large"
          elevation={4}
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
};

export default CategoryForm;
