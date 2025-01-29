"use client";

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft, FaCalendar, FaPlus } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation";
import Toast from "@/app/components/UI/Toast";
import { Category } from "@/app/model/CategoryModel";

const UpdateCategory = () => {
  const { id } = useParams();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Category>({
    category: "",
    remark: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchCategoryData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

          const response = await fetch(`${apiUrl}/api/v1/categories/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch category");
          }
          const data = await response.json();
          setFormData({
            category: data.data.category,
            remark: data.data.remark,
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
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setFormData({
        category: "",
        remark: "",
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      setSuccess("Category updated successfully");
      setError(null);
      setLoading(false);
    } catch (error) {
      setError(`${error}`);
      setSuccess(null);
      setLoading(false);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="Education Details"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
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

          <form className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div>
                <Input
                  type="text"
                  label="Category Name"
                  placeholder="Enter Category Name"
                  value={formData.category}
                  onChange={handleChange}
                  name="category"
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

      {success && (
        <Toast type="success" message={success} position={"top-right"} />
      )}

      {error && <Toast type="error" message={error} position={"top-right"} />}

      <div className="flex justify-end mt-4 mr-24">
        <Button
          color="primary"
          text={loading ? "Saving..." : "Update Category"}
          size="large"
          elevation={4}
          onClick={handleSubmit}
          icon={<FaPlus />}
        />
      </div>
    </div>
  );
};

export default UpdateCategory;
