"use client";

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation";
import { Region } from "@/app/model/RegionModel";
import Toast from "@/app/components/UI/Toast"; // Import Toast component

const UpdateRegionForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<Region>({
    name: "",
    lattitude: "",
    longitude: "",
    city: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    position: "top-right";
  } | null>(null); // State to manage Toast

  useEffect(() => {
    if (id) {
      const fetchRegionData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${apiUrl}/api/v1/regions/${id}`, {
            method: "GET",
          });
          if (response.ok) {
            const data = await response.json();
            setFormData({
              name: data.data.name,
              lattitude: data.data.lattitude,
              longitude: data.data.longitude,
              city: data.data.city,
            });
          } else {
            setError("Failed to fetch region data");
          }
        } catch (error) {
          setError(`${error}`);
        } finally {
          setLoading(false);
        }
      };

      fetchRegionData();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "lattitude" || name === "longitude" ? value : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/api/v1/regions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setToast({
          message: "Region updated successfully!",
          type: "success",
          position: "top-right",
        });
        setFormData({
          name: "",
          lattitude: "",
          longitude: "",
          city: "",
        });
      } else {
        setError("Failed to update region");
        setToast({
          message: "Failed to update region",
          type: "error",
          position: "top-right",
        });
      }
    } catch (error) {
      setError(`${error}`);
      setToast({
        message: "An error occurred",
        type: "error",
        position: "top-right",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className=" pb-5">
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="Education Details"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
      >
        <Card
          title="Region Form"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  label="Region Name"
                  placeholder="Enter region name"
                  value={formData.name}
                  onChange={handleChange}
                  name="name" // Corrected name attribute
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Latitude"
                  placeholder="Enter latitude"
                  value={formData.lattitude}
                  onChange={handleChange}
                  name="lattitude"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Longitude"
                  placeholder="Enter longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  name="longitude"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="City Name"
                  placeholder="Enter city name"
                  value={formData.city}
                  onChange={handleChange}
                  name="city"
                />
              </div>
            </div>
          </form>
        </Card>
      </BoxWrapper>

      <div className="flex justify-end mt-4 mr-24 space-x-4">
        <Button
          color="primary"
          text="Update Region"
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

export default UpdateRegionForm;
