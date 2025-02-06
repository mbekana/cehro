'use client';

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation";
import { Metrics } from "@/app/model/Metrics";
import Toast from "@/app/components/UI/Toast";
import Cookies from "js-cookie";


const UpdateMetricsForm = () => {
  const { id } = useParams();
  
  const [formData, setFormData] = useState<Metrics>({
    metrics: "",
    remark: "",
  });
  const [userData, setUserData] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    position: "top-right";
  } | null>(null); 

  useEffect(() => {
        console.log("HI: ", Cookies.get("userData"));
        const user = Cookies.get("userData")
          ? JSON.parse(Cookies.get("userData")!)
          : null;
        setUserData(user);
      }, []);
    
  useEffect(() => {
    if (id) {
      const fetchMetricData = async () => {
        setLoading(true);
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${apiUrl}/api/v1/metrics/${id}`);

          if (response.ok) {
            const data = await response.json();
            setFormData({
              metrics: data.data.metrics,
              remark: data.data.remark,
            });
          }
        } catch (err) {
        } finally {
          setLoading(false);
        }
      };

      fetchMetricData();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const payload = { ...formData, updatedById:userData?.id};
      const response = await fetch(`${apiUrl}/api/v1/metrics/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();  
        throw new Error(errorData.message || "An error occurred while submitting the data.");
      }
  
      setFormData({ metrics: "", remark: "" });
      setToast({
        message: "You have updated metrics successfully.",
        type: "success",
        position: "top-right",
      });
    } catch (error) {
      console.error("Error: ", error); 
      setToast({
        message: error instanceof Error ? error.message : "An unknown error occurred.",
        type: "error",
        position: "top-right",
      });
    } finally {
      setLoading(false); 
    }
  };
  

  return (
    <div className="pb-5">
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="Education Details"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
      >
        <Card
          title="Update Metric Form"
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
          

          <form  className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div>
                <Input
                  type="text"
                  label="Metrics Name"
                  placeholder="Enter name"
                  value={formData.metrics}
                  onChange={handleChange}
                  name="metrics"
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
                text={loading ? "Updating..." : "Update Metric"}
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

export default UpdateMetricsForm;
