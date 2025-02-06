"use client";

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation";
import { Education } from "@/app/model/EducationModel";
import Toast from "@/app/components/UI/Toast";
import Cookies from "js-cookie";

const UpdateEducationForm = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    position: "top-right";
  } | null>(null); 

  const { id } = useParams();
  const [userData, setUserData] = useState<any>(null);
  const [formData, setFormData] = useState<Education>({
    education: "",
    remark: "",
  });

   useEffect(() => {
      console.log("HI: ", Cookies.get("userData"));
      const user = Cookies.get("userData")
        ? JSON.parse(Cookies.get("userData")!)
        : null;
      setUserData(user);
    }, []);

  useEffect(() => {
    const fetchEducationData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      try {
        const response = await fetch(`${apiUrl}/api/v1/educations/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch education data");
        }
        const data = await response.json();
        setFormData({
          education: data.data.education,
          remark: data.data.remark,
        });
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };

    if (id) {
      fetchEducationData();
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
      const payload = {
        ...formData
      };
      const response = await fetch(`${apiUrl}/api/v1/educations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create education");
      }
      setFormData({ education: "", remark: "" });
      setToast({
        message: "You have updated education successfully.",
        type: "success",
        position: "top-right",
      });
    } catch (error) {
      setToast({
        message: `${error.message}`,
        type: "error",
        position: "top-right",
      });
    }
  };

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="Update Education"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
      >
        <Card
          title="Update Education Form"
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
                  label="Education Level"
                  placeholder="Enter Education"
                  value={formData.education}
                  onChange={handleChange}
                  name="education"
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

      <div className="flex justify-end mt-4 mr-24 space-x-4">
        <Button
          color="primary"
          text="Update Education"
          size="large"
          elevation={4}
          borderRadius={3}
          onClick={handleSubmit}
        />
      </div>
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

export default UpdateEducationForm;
