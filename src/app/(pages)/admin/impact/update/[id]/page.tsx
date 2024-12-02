'use client';

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation";

type ImpactFormData = {
  name: string;
  remark: string;
};

const UpdateImpactForm = () => {
  const { id } = useParams(); // Get impact ID from URL
  const [formData, setFormData] = useState<ImpactFormData>({
    name: "",
    remark: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchImpactData = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
          const response = await fetch(`${apiUrl}/impacts/${id}`);
          if (response.ok) {
            const data = await response.json();
            setFormData({
              name: data.name,
              remark: data.remark,
            });
          } else {
            console.error("Impact not found");
          }
        } catch (error) {
          console.error("Error fetching impact data", error);
        }
      };

      fetchImpactData();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      const response = await fetch(`${apiUrl}/impacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update impact");
      }

      setSuccessMessage("Impact updated successfully");

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
        title="Impact Update"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Update Impact Form"
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
                  label="Impact Name"
                  placeholder="Enter name"
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
    
      <div className="flex justify-end mt-4 mr-24">
        <Button
          color="primary"
          text="Save Impact"
          size="large"
          elevation={4}
          borderRadius={3} 
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default UpdateImpactForm;
