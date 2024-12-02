"use client";

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation"; 


const UpdateOccupationForm = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);  
  const { id } = useParams(); 
  const [formData, setFormData] = useState<any>({
    name: "",
    remark: "",
  });


  useEffect(() => {
    const fetchOccupationData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/occupations/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch occupation data");
        }
        const data = await response.json();
        setFormData({
          name: data.name,
          remark: data.remark,
        });
      } catch (error) {
        console.error("Error fetching occupation data:", error);
      }
    };

    if (id) {
      fetchOccupationData();
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
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/occupations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update occupation data");
      }
      setSuccessMessage("Education created successfully");
      setError(error);
      setFormData({ name: "", remark: "" });

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      const updatedOccupation = await response.json();
      console.log("Updated occupation:", updatedOccupation);
    
    } catch (error) {
      console.error("Error updating occupation:", error);
    }
  };



  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaCalendar />}
        title="Occupation Maintenance"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Update Occupation Form"
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
                  label="Occupation"
                  placeholder="Enter Occupation"
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
        <div className="mt-4 text-center text-green-500">{successMessage}</div>
      )}

      {error && <div className="mt-4 text-center text-red-500">{error}</div>}
      <div className="flex justify-end mt-4 mr-24 space-x-4">
        <Button
          color="primary"
          text="Update Occupation"
          size="large"
          elevation={4}
          borderRadius={3}
          onClick={handleSubmit}
        />
 
      </div>
    </div>
  );
};

export default UpdateOccupationForm;
