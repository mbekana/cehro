"use client";

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import Toast from "@/app/components/UI/Toast";
import { Education } from "@/app/model/EducationModel";
import { Impact } from "@/app/model/Impact";

type IncidentFormData = {
  region: string;
  respondent_residence: string;
  gender: string;
  age: string;
  education: string;
  occupation: string;
  date_of_incidence: string;
  location_of_incidence: string;
  incident_happened: {
    woreda: string;
    zone: string;
  };
  metrics: string;
  source_of_information: string;
  insight: string;
  impact: string;
};

const IncidentForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [metrics, setMetrics] = useState<any[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [occupation, setOccupation] = useState<Education[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [formData, setFormData] = useState<IncidentFormData>({
    region: "",
    respondent_residence: "",
    gender: "",
    age: "",
    education: "",
    occupation: "",
    date_of_incidence: "",
    location_of_incidence: "",
    incident_happened: { woreda: "", zone: "" },
    metrics: "",
    source_of_information: "",
    insight: "",
    impact: "",
  });

  useEffect(() => {
    fetchMetrics();
    fetchEducations();
    fetchImpacts();
    fetchRegions();
    fetchOccupations()
    fetchSources()
  }, []);

  const fetchOccupations = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/occupations`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setOccupation(data);
      } else {
        throw new Error("Failed to fetch occupations");
      }
    } catch (error: any) {
      setError("Error fetching occupations: " + error.message);
      console.error("Error fetching occupations:", error);
    } finally {
      setLoading(false);
    }
  };


  const fetchSources = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/sources`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setSources(data);
      } else {
        throw new Error("Failed to fetch sources");
      }
    } catch (error: any) {
      setError("Error fetching sources: " + error.message);
      console.error("Error fetching sources:", error);
    } finally {
      setLoading(false);
    }
  };


  const fetchMetrics = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/metrics`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
        console.log("Metrics: ", metrics)
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const fetchImpacts = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/impacts`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setImpacts(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const fetchRegions = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/regions`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setRegions(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const fetchEducations = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/educations`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setEducations(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("incident_happened")) {
      const field = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        incident_happened: {
          ...prevData.incident_happened,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const formDataWithStatus = {
        ...formData,
        status: "PENDING",
      };
      const response = await fetch(`${apiUrl}/incidents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithStatus),
      });

      if (!response.ok) {
        throw new Error("Failed to save incident");
      }

      setFormData({
        region: "",
        respondent_residence: "",
        gender: "",
        age: "",
        education: "",
        occupation: "",
        date_of_incidence: "",
        location_of_incidence: "",
        incident_happened: { woreda: "", zone: "" },
        metrics: "",
        source_of_information: "",
        insight: "",
        impact: "",
      });
      setSuccess("Incident saved successfully!");
      setError(null);
      setLoading(false);
      console.log("Incident saved successfully!");
    } catch (error) {
      setSuccess(null);
      setError(error);
      setLoading(false);
      console.error("Error saving incident:", error);
    }
  };

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="Incident Registration"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
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

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  type="select"
                  label="Region"
                  placeholder="Region"
                  value={formData.region}
                  onChange={handleChange}
                  name="region"
                >
                  <option value="">Select Region</option>
                  {regions.map((region, index) => (
                    <option key={index} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </Input>
              </div>

              <div>
                <Input
                  type="text"
                  label="Respondent Residence"
                  placeholder="Respondent Residence"
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
                  label="Age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  name="age"
                />
              </div>

              <div>
                <Input
                  type="select"
                  label="Education"
                  placeholder=" Education"
                  value={formData.education}
                  onChange={handleChange}
                  name="education"
                >
                  <option value="">Select Education</option>

                  {educations.map((education, index) => (
                    <option key={index} value={education.id}>
                      {education.name}
                    </option>
                  ))}
                </Input>
              </div>

              <div>
                <Input
                  type="text"
                  label="Occupation"
                  placeholder=" occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  name="occupation"
                >
                  <option value="">Select Occupation</option>
                  {occupation.map((oc, index)=>(<option key={index} value={oc.id}>{oc.name}</option>))}
                  </Input>
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
                  placeholder=" location"
                  value={formData.location_of_incidence}
                  onChange={handleChange}
                  name="location_of_incidence"
                />
              </div>

              <div>
                <Input
                  type="select"
                  label="Impacts"
                  placeholder="Impacts"
                  value={formData.impact}
                  onChange={handleChange}
                  name="impact"
                >
                  <option value="">Select Impact</option>

                  {impacts.map((impact, index) => (
                    <option key={index} value={impact.id}>
                      {impact.name}
                    </option>
                  ))}
                </Input>
              </div>
              <div>
                <Input
                  type="text"
                  label="Woreda/Kebele"
                  placeholder="Woreda/Kebele"
                  value={formData.incident_happened.woreda}
                  onChange={handleChange}
                  name="incident_happened.woreda"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Zone/Subcity"
                  placeholder="Zone/Subcity"
                  value={formData.incident_happened.zone}
                  onChange={handleChange}
                  name="incident_happened.zone"
                />
              </div>

              <div>
                <Input
                  type="select"
                  label="Metrics"
                  placeholder=" Metrics"
                  value={formData.metrics}
                  onChange={handleChange}
                  name="category"
                >
                  {metrics.map((metirc, index) => (
                    <option key={index} value={metirc.id}>
                      {metirc.name}
                    </option>
                  ))}
                  <option value="">Select Metrics</option>
                </Input>
              </div>

              <div>
                <Input
                  type="select"
                  label="Source of Information"
                  value={formData.source_of_information}
                  onChange={handleChange}
                  name="source_of_information"
                >
                  <option value="">Select Source</option>
                  {sources.map((source, index) => (
                    <option key={index} value={source.id}>
                      {source.name}
                    </option>
                  ))}                </Input>
              </div>
              <div>
                <Input
                  type="textarea"
                  label="CEHOR's Insight"
                  placeholder="Insight"
                  value={formData.insight}
                  onChange={handleChange}
                  name="insight"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 mr-24">
              <Button
                icon={<FaPlus />}
                color="primary"
                text={`${loading ? "Saving..." : "Save Incident"}`}
                size="large"
                elevation={4}
                onClick={handleSubmit}
              />
            </div>

            {success && (
              <Toast
                message={success}
                type="success"
                position="top-right"
                onClose={() => setSuccess(null)}
              />
            )}

            {error && (
              <Toast
                message={error}
                type="error"
                position="top-right"
                onClose={() => setError(null)}
              />
            )}
          </form>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default IncidentForm;
