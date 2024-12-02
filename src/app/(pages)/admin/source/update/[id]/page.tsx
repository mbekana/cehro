'use client';

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams, useRouter } from "next/navigation"; 

type SourceOfInformationFormData = {
  name: string;
  remark: string;
};

const UpdateSourceOfInformationForm = () => {
  const { id } = useParams(); // Getting the id from URL parameters
  const router = useRouter(); // For redirecting after update
  
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); 
  const [formData, setFormData] = useState<SourceOfInformationFormData>({
    name: "",
    remark: "",
  });

  // Fetching existing source data based on the id
  useEffect(() => {
    if (id) {
      const fetchSourceData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${apiUrl}/sources/${id}`);
          if (response.ok) {
            const data = await response.json();
            setFormData({
              name: data.name,
              remark: data.remark,
            });
          } else {
            console.error("Source not found");
          }
        } catch (error) {
          console.error("Error fetching source data", error);
        }
      };

      fetchSourceData();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${apiUrl}/sources/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update source");
      }

      setSuccessMessage("Source updated successfully");

      // Clear form and redirect after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
        router.push("/sources"); // Redirect to sources list page after successful update
      }, 3000);
    } catch (error) {
      setError(`Error: ${error}`);
    }
  };

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaCalendar />}
        title="Update Source Of Information"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Update Source Of Information Form"
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

          {/* Display form if source data is loaded */}
          {formData && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col space-y-4">
                <div>
                  <Input
                    type="text"
                    label="Source of Information"
                    placeholder="Enter Source"
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
          )}
        </Card>
      </BoxWrapper>

      {successMessage && (
        <div className="mt-4 text-center text-green-500">{successMessage}</div>
      )}

      {error && <div className="mt-4 text-center text-red-500">{error}</div>}

      <div className="flex justify-end mt-4 mr-24">
        <Button
          color="primary"
          text="Save Changes"
          size="large"
          elevation={4}
          borderRadius={3} 
          onClick={handleSubmit} // Handle submit on button click
        />
      </div>
    </div>
  );
};

export default UpdateSourceOfInformationForm;
