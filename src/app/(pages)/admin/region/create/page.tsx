"use client";

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { Region } from "@/app/model/RegionModel";
import Toast from "@/app/components/UI/Toast";
import Cookies from "js-cookie";

const RegionForm = () => {
  const [userData, setUserData] = useState<any>(null);

  const [formData, setFormData] = useState<Region>({
    name: "",
    lattitude: "",
    longitude: "",
    city: "",
  });
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const payload = {...formData, createdBy:userData?.id};
      const response = await fetch(`${apiUrl}/api/v1/regions/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create region");
      }

      setToast({
        message: "Region updated successfully!",
        type: "success",
        position: "top-right",
      });

      setFormData({ name: "", lattitude: "", longitude: "", city: "" });

    } catch (error) {
      setToast({
        message: `${error.message}`,
        type: "error",
        position: "top-right",
      });
    }
  };

  return (
    <div className=" pb-5">
      <BoxWrapper
        icon={<FaCalendar />}
        title="Region Maintenance"
        borderColor="border-primary"
        borderThickness="border-b-4"
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
                  name="name"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Lat"
                  placeholder="Enter latitude"
                  value={formData.lattitude}
                  onChange={handleChange}
                  name="lattitude"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Long"
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
      <div className="flex justify-end mt-4 mr-24">
        <Button
          color="primary"
          text="Save Incident"
          size="large"
          elevation={4}
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

export default RegionForm;
