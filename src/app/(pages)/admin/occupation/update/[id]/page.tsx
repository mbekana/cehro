"use client";

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation";
import Toast from "@/app/components/UI/Toast";
import { Occupation } from "@/app/model/Occupation";

const UpdateOccupationForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<Occupation>({
    occupation: "",
    remark: "",
  });

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    position: "top-right";
  } | null>(null);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchOccupationData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/api/v1/occupations/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch occupation data");
        }
        const data = await response.json();
        setFormData({
          occupation: data.data.occupation,
          remark: data.data.remark,
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
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const payload = {
        ...formData      };
      const response = await fetch(`${apiUrl}/api/v1/occupations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "An error occurred while submitting the data."
        );
      }

      setFormData({ occupation: "", remark: "" });
      setToast({
        message: "You have created occupation successfully.",
        type: "success",
        position: "top-right",
      });
    } catch (error) {
      setToast({
        message: `${error.message}`,
        type: "error",
        position: "top-right",
      });
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="pb-5">
      <BoxWrapper
           icon={<FaArrowLeft />}
           title="Occupation Update Form"
           borderColor="border-primary"
           borderThickness="border-b-4"
           shouldGoBack={true}
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
                  value={formData.occupation}
                  onChange={handleChange}
                  name="occupation"
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
            <div className="flex justify-end mt-4">
              <Button
                color="primary"
                text={loading ? "Saving..." : "Save Occupation"}
                size="large"
                elevation={4}
                borderRadius={3}
                disabled={loading}
                onClick={handleSubmit}
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

export default UpdateOccupationForm;
