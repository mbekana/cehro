"use client";

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation";
import { Education } from "@/app/model/EducationModel";
import { Impact } from "@/app/model/Impact";
import Toast from "@/app/components/UI/Toast";
import { Incident } from "@/app/model/Incident";
import Cookies from "js-cookie";

const UpdateIncidentForm = () => {
  const { id } = useParams();
  const [metrics, setMetrics] = useState<any[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [occupation, setOccupation] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [sources, setSources] = useState<any[]>([]);

  const [formData, setFormData] = useState<Incident>({
    gender: "",
    age: "",
    education: "",
    occupation: "",
    impact: "",
    region: "",
    respondent_address: "",
    zone_subcity: "",
    metrics: "",
    cehro_insights: "",
    date: "",
    location: "",
    woreda_kebele: "",
    source: "",
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

  useEffect(() => {
    if (!id) {
      console.log("No incident ID provided");
      return;
    }

    const fetchIncidentData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/api/v1/incidents/${id}`);
        if (!response.ok) {
          console.error("Failed to fetch incident data", response.status);
          return;
        }

        const data = await response.json();
        console.log("Incident: ", data.data)
        setFormData(data.data);
      } catch (error) {
        console.error("Error fetching incident data:", error);
      }
    };

    fetchIncidentData();
  }, [id]);

  useEffect(() => {
    fetchMetrics();
    fetchEducations();
    fetchImpacts();
    fetchRegions();
    fetchOccupations();
    fetchSources();
  }, []);

  const fetchOccupations = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/occupations/all`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setOccupation(data.data);
      } else {
        throw new Error("Failed to fetch occupations");
      }
    } catch (error: any) {
      console.error("Error fetching occupations:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSources = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/sources/all`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setSources(data.data);
      } else {
        throw new Error("Failed to fetch sources");
      }
    } catch (error: any) {
      console.error("Error fetching sources:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetrics = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/metrics/all`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setMetrics(data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchImpacts = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/impacts/all`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setImpacts(data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchRegions = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/regions/all`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setRegions(data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEducations = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/educations`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setEducations(data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.region || !formData.gender || !formData.age) {
      setToast({
        message: "Please check all fields",
        type: "error",
        position: "top-right",
      });
      return;
    }

    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const payload = { ...formData, approvedBy: userData?.id };
      const response = await fetch(`${apiUrl}/api/v1/incidents/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update incident");
      }
      setToast({
        message: "You have updated Incident successfully.",
        type: "success",
        position: "top-right",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setToast({
        message: `${error.message}`,
        type: "error",
        position: "top-right",
      });
    }
  };

  return (
    <div className="pb-5">
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="Incident Maintenance"
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
                  value={formData.respondent_address}
                  onChange={handleChange}
                  name="respondent_address"
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
                  placeholder="age group"
                  value={formData.age}
                  onChange={handleChange}
                  name="age"
                />
              </div>

              <div>
                <Input
                  type="select"
                  label="Education"
                  placeholder="Education"
                  value={formData.education}
                  onChange={handleChange}
                  name="education"
                >
                  <option value="">Select Education</option>
                  {educations.map((education, index) => (
                    <option key={index} value={education.education}>
                      {education.education}
                    </option>
                  ))}
                </Input>
              </div>

              <div>
                <Input
                  type="select"
                  label="Occupation"
                  placeholder="Occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  name="occupation"
                >
                  <option value="">Select Occupation</option>
                  {occupation.map((oc, index) => (
                    <option key={index} value={oc.occupation}>
                      {oc.occupation}
                    </option>
                  ))}
                </Input>
              </div>

              <div>
                <Input
                  type="date"
                  label="Date of Incidence"
                  placeholder="Select date"
                  value={formData.date}
                  onChange={handleChange}
                  name="date"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Location of Incidence"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  name="location"
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
                    <option key={index} value={impact.impact}>
                      {impact.impact}
                    </option>
                  ))}
                </Input>
              </div>

              <div>
                <Input
                  type="text"
                  label="Woreda"
                  placeholder="Woreda"
                  value={formData.woreda_kebele}
                  onChange={handleChange}
                  name="woreda_kebele"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Zone"
                  placeholder="Zone"
                  value={formData.zone_subcity}
                  onChange={handleChange}
                  name="zone_subcity"
                />
              </div>

              <div>
                <Input
                  type="select"
                  label="Metrics"
                  placeholder="Metrics"
                  value={formData.metrics}
                  onChange={handleChange}
                  name="metrics"
                >
                  <option value="">Select Metrics</option>
                  {metrics.map((metric, index) => (
                    <option key={index} value={metric.metrics}>
                      {metric.metrics}
                    </option>
                  ))}
                </Input>
              </div>

    
              <div>
                <Input
                  type="select"
                  label="Source of Information"
                  value={formData.source}
                  onChange={handleChange}
                  name="source"
                >
                  <option value="">Select Source</option>
                  {sources.map((source, index) => (
                    <option key={index} value={source.source}>
                      {source.source}
                    </option>
                  ))}{" "}
                </Input>
              </div>

              <div>
                <Input
                  type="textarea"
                  label="CEHOR's Insight"
                  placeholder="Insight"
                  value={formData.cehro_insights}
                  onChange={handleChange}
                  name="cehro_insights"
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

export default UpdateIncidentForm;
