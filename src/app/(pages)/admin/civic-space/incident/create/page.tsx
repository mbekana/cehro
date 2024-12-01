"use client";

import React, { useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";

type IncidentFormData = {
  region: string;
  respondent_residence: string;
  gender: string;
  age_group: string;
  education: string;
  occupation: string;
  date_of_incidence: string;
  location_of_incidence: string;
  incident_happened: {
    woreda: string;
    zone: string;
  };
  category: string;
  source_of_information: string;
};

const IncidentForm = () => {
  const [formData, setFormData] = useState<IncidentFormData>({
    region: "",
    respondent_residence: "",
    gender: "",
    age_group: "",
    education: "",
    occupation: "",
    date_of_incidence: "",
    location_of_incidence: "",
    incident_happened: { woreda: "", zone: "" },
    category: "",
    source_of_information: "",
  });

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Check if the input belongs to 'incident_happened' object
    if (name.startsWith("incident_happened")) {
      const field = name.split(".")[1]; // Get 'woreda' or 'zone'
      setFormData((prevData) => ({
        ...prevData,
        incident_happened: {
          ...prevData.incident_happened,
          [field]: value, // Update the correct field
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission and send data to the API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/admin/api/civic-space/incident", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (!response.ok) {
        throw new Error("Failed to save incident");
      }

      // Optionally reset form data
      setFormData({
        region: "",
        respondent_residence: "",
        gender: "",
        age_group: "",
        education: "",
        occupation: "",
        date_of_incidence: "",
        location_of_incidence: "",
        incident_happened: { woreda: "", zone: "" },
        category: "",
        source_of_information: "",
      });

      console.log("Incident saved successfully!");
    } catch (error) {
      console.error("Error saving incident:", error);
    }
  };

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaCalendar />}
        title="Incident Maintenance"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Incident Form"
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
                  label="Region"
                  placeholder="Enter region"
                  value={formData.region}
                  onChange={handleChange}
                  name="region"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Respondent Residence"
                  placeholder="Enter respondent residence"
                  value={formData.respondent_residence}
                  onChange={handleChange}
                  name="respondent_residence"
                />
              </div>

              <div>
                <Input
                  type="select"
                  label="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                  name="gender"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Input>
              </div>

              <div>
                <Input
                  type="text"
                  label="Age Group"
                  placeholder="Enter age group"
                  value={formData.age_group}
                  onChange={handleChange}
                  name="age_group"
                />
              </div>

              <div>
                <Input
                  type="select"
                  label="Education"
                  placeholder="Enter Education"
                  value={formData.education}
                  onChange={handleChange}
                  name="education"
                >
                  <option value="">Select Education</option>
                  <option value="1">Education 1</option>
                  <option value="2">Education 2</option>
                  <option value="3">Education 3</option>
                </Input>
              </div>

              <div>
                <Input
                  type="text"
                  label="Occupation"
                  placeholder="Enter occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  name="occupation"
                />
              </div>

              <div>
                <Input
                  type="date"
                  label="Date of Incidence"
                  placeholder="Select date"
                  value={formData.date_of_incidence}
                  onChange={handleChange}
                  name="date_of_incidence"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Location of Incidence"
                  placeholder="Enter location"
                  value={formData.location_of_incidence}
                  onChange={handleChange}
                  name="location_of_incidence"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Woreda"
                  placeholder="Enter woreda"
                  value={formData.incident_happened.woreda}
                  onChange={handleChange}
                  name="incident_happened.woreda"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Zone"
                  placeholder="Enter zone"
                  value={formData.incident_happened.zone}
                  onChange={handleChange}
                  name="incident_happened.zone"
                />
              </div>

              <div>
                <Input
                  type="select"
                  label="Category"
                  placeholder="Enter category"
                  value={formData.category}
                  onChange={handleChange}
                  name="category"
                >
                  <option value="">Select Category</option>
                  <option value="1">Category 1</option>
                  <option value="2">Category 2</option>
                  <option value="3">Category 3</option>
                </Input>
              </div>

              <div>
                <Input
                  type="textarea"
                  label="Source of Information"
                  placeholder="Enter source of information"
                  value={formData.source_of_information}
                  onChange={handleChange}
                  name="source_of_information"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 mr-24">
              <Button
                color="primary"
                text="Save Incident"
                size="large"
                elevation={4}
              />
            </div>
          </form>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default IncidentForm;
