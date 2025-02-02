"use client";

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation";
import { Source } from "@/app/model/Source";
import Toast from "@/app/components/UI/Toast";
import Cookies from "js-cookie";


const UpdateSourceOfInformationForm = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    position: "top-right";
  } | null>(null);

  const [formData, setFormData] = useState<Source>({
    source: "",
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
    if (id) {
      const fetchSourceData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

          const response = await fetch(`${apiUrl}/api/v1/sources/${id}`);
          if (response.ok) {
            const data = await response.json();
            setFormData({
              source: data.data.source,
              remark: data.data.remark,
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
    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const payload = {
        ...formData,
      };
      const response = await fetch(`${apiUrl}/api/v1/sources/${id}`, {
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

      setFormData({ source: "", remark: "" });
      setToast({
        message: "You have created source successfully.",
        type: "success",
        position: "top-right",
      });
    } catch (error) {
      setToast({
        message: `${error.message}`,
        type: "error",
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="Sources Form"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
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

          {formData && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col space-y-4">
                <div>
                  <Input
                    type="text"
                    label="Source of Information"
                    placeholder="Enter Source"
                    value={formData.source}
                    onChange={handleChange}
                    name="source"
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
                  text={loading ? "Saving..." : "Update Source"}
                  size="large"
                  elevation={4}
                  borderRadius={3}
                  disabled={loading}
                  onClick={handleSubmit}
                />
              </div>
            </form>
          )}
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

export default UpdateSourceOfInformationForm;
