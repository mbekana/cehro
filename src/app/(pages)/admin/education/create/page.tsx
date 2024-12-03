"use client";

import React, { useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import Toast from "@/app/components/UI/Toast";

type EducationFormData = {
  name: string;
  remark: string;
};

const EducationForm = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EducationFormData>({
    name: "",
    remark: "",
  });

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

    // Validate form fields
    if (!formData.name.trim() || !formData.remark.trim()) {
      setError("Both fields are required!");
      return;
    }

    setError(null); // Clear any previous errors

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${apiUrl}/educations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create education");
      }

      setSuccessMessage("Education created successfully");

      // Reset form data
      setFormData({ name: "", remark: "" });

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setError(`Error: ${error}`);
    }
  };

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaCalendar />}
        title="Education Maintenance"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Education Form"
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

          <form className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div>
                <Input
                  type="text"
                  label="Education Level"
                  placeholder="Enter Education"
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

      {successMessage && (
        <Toast
          message={successMessage}
          type="success"
          position="top-right"
          onClose={() => setSuccessMessage(null)}
        />
      )}

      {error && (
        <Toast
          message={error}
          type="error"
          position="top-right"
          onClose={() => setError(null)}
        />
      )}

      <div className="flex justify-end mt-4 mr-24">
        <Button
          color="primary"
          text="Save Education"
          size="large"
          elevation={4}
          borderRadius={3}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EducationForm;
