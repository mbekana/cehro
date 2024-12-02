'use client';

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation"; 
import { Region } from "@/app/model/RegionModel";



const UpdateRegionForm = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState<Region>({
    name: "",
    lat: 0,
    long: 0,
    city: "",
  });
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (id) {
      const fetchRegionData = async () => {
        try {
          const response = await fetch(`/admin/api/region/${id}`, {method:'GET'});
          if (response.ok) {
            const data = await response.json();
            setFormData({
              name: data.name,
              lat: data.lat, 
              long: data.long,
              city: data.city,
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
      [name]: name === "lat" || name === "long" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/regions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Region updated successfully!");
      } else {
        setError("Failed to update region");
      }
    } catch (error) {
      setError(`${error}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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

          <form  className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  label="Region Name"
                  placeholder="Enter region name"
                  value={formData.name}
                  onChange={handleChange}
                  name="regionName"
                />
              </div>

              <div>
                <Input
                  type="number"
                  label="Latitude"
                  placeholder="Enter latitude"
                  value={formData.lat.toString()}
                  onChange={handleChange}
                  name="lat"
                />
              </div>

              <div>
                <Input
                  type="number"
                  label="Longitude"
                  placeholder="Enter longitude"
                  value={formData.long.toString()}
                  onChange={handleChange}
                  name="long"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="City Name"
                  placeholder="Enter city name"
                  value={formData.city}
                  onChange={handleChange}
                  name="main_city"
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
    </div>
  );
};

export default UpdateRegionForm;
