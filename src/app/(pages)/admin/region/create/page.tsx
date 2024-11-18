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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-white pb-5">
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

          <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="flex justify-end mt-4 mr-24">
        <Button color="primary" text="Save Incident" size="large" elevation={4} />
      </div>
    </div>
  );
};

export default RegionForm;
