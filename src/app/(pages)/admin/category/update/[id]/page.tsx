'use client';

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation";

type RegionFormData = {
  name: string;
  remark: string;
};

const UpdateCategory = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<RegionFormData>({
    name: "",
    remark: "",
  });
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (id) {
      const fetchCategoryData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

          const response = await fetch(`${apiUrl}/categories/${id}`, {method:'PATCH'});
          if (!response.ok) {
            throw new Error("Failed to fetch category");
          }
          const data = await response.json();
          setFormData({
            name: data.name,
            remark: data.remark,
          });
        } catch (error) {
          setError(`${error}`);
        } finally {
          setLoading(false);
        }
      };

      fetchCategoryData();
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
      const response = await fetch(`/admin/api/category/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

    } catch (error) {
      setError(`${error}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaCalendar />}
        title="Category Maintenance"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Update Category"
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

      <div className="flex justify-end mt-4 mr-24">
        <Button
          color="primary"
          text="Update Category"
          size="large"
          elevation={4}
        />
      </div>
    </div>
  );
};

export default UpdateCategory;
