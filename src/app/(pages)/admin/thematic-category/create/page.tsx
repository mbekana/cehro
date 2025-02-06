"use client";

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import Toast from "@/app/components/UI/Toast";
import { ThematicCategory } from "@/app/model/ThematicCategory";
import Cookies from "js-cookie";

const ThematicCategoryForm = () => {
  const [formData, setFormData] = useState<ThematicCategory>({
    category: "",
    remark: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("HI: ", Cookies.get("userData"));
    const user = Cookies.get("userData")
      ? JSON.parse(Cookies.get("userData")!)
      : null;
    setUserData(user);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const payload = { ...formData, createdById: userData?.id };
      const response = await fetch(`${apiUrl}/api/v1/thematic-categories/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create thematic category");
      }

      const result = await response.json();
      setSuccess(`Thematic Category created successfully: ${result.name}`);
      setError(null);
      setFormData({
        category: "",
        remark: "",
      });
    } catch (error: any) {
      setSuccess(null);
      setError(`${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-5">
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="Thematic Category Maintenance"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
      >
        <Card
          title="Thematic Category Form"
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
                  label="Thematic Category Name"
                  placeholder="Enter Thematic Category Name"
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
          text={isSubmitting ? "Submitting..." : "Save Thematic Category"}
          size="large"
          elevation={4}
          disabled={isSubmitting}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ThematicCategoryForm;
