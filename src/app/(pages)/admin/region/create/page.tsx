"use client";

import React, { useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";

type RegionFormData = {
  regionName: string;
  location: {
    lat: number;
    long: number;
  };
  main_city: string;
};

const RegionForm = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);  
  const [formData, setFormData] = useState<RegionFormData>({
    regionName: "",
    location: { lat: 0, long: 0 },
    main_city: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "lat" || name === "long" ? Number(value) : value, 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${apiUrl}/regions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create region");
      }

      setSuccessMessage("Region created successfully");

      setFormData({  regionName: "",
        location: { lat: 0, long: 0 },
        main_city: "", });

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setError(`Error: ${error}`);
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

          <form  className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
              <div>
                <Input
                  type="text" 
                  label="Region Name"
                  placeholder="Enter region name"
                  value={formData.regionName}
                  onChange={handleChange}
                  name="regionName" 
                />
              </div>

              <div>
                <Input
                  type="number"
                  label="Lat"
                  placeholder="Enter latitude"
                  value={formData.location.lat.toString()} 
                  onChange={handleChange}
                  name="lat"
                />
              </div>

              <div>
                <Input
                  type="number"
                  label="Long"
                  placeholder="Enter longitude"
                  value={formData.location.long.toString()} 
                  onChange={handleChange}
                  name="long" 
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="City Name"
                  placeholder="Enter city name"
                  value={formData.main_city}
                  onChange={handleChange}
                  name="main_city" 
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
        <Button color="primary" text="Save Incident" size="large" elevation={4} 
        onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default RegionForm;
