"use client";

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { Impact } from "@/app/model/Impact";
import Toast from "@/app/components/UI/Toast";
import { useParams } from "next/navigation";

const AuthorityDecisionForm = () => {
  const { id } = useParams();
  const [metrics, setMetrics] = useState<any[]>([]);
  const [regions, setRegions] = useState<Impact[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [origins, setOrigins] = useState<any[]>([]);
  const [geographicScopes, setGeographicsScopes] = useState<any[]>([]);
  const [thematicCategories, setThematicCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({
    title: "",
    city: "",
    region: "",
    source: "",
    file: null,
    media: null,
    mediaType: "",
    metrics: "",
    insight: "",
    impact: "",
    origin: "",
    date: "",
    geographicScope:"",
    thematicCategory:"",
    summary:""
  });

  useEffect(() => {
    fetchMetrics();
    fetchRegions();
    fetchSources();
    fetchImpacts();
    fetchThematicCategories();
    if (id && (typeof id === 'string' || typeof id === 'number')) {
      fetchDataForEdit(id);
    }
    
    const origs = [
      { id: 1, name: "New" },
      { id: 2, name: "Revised" },
    ];

    const geographicScope = [
      { id: 1, name: "National" },
      { id: 2, name: "Regional" },
    ];

    setOrigins(origs);
    setGeographicsScopes(geographicScope);
    setThematicCategories(thematicCategories);
  }, [id]);

  const fetchDataForEdit = async (id: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/authorityDecisions/${id}`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        console.log("DATA: ", data)
        setFormData(data); 
      } else {
        console.error("Failed to fetch data for edit");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMetrics = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/metrics`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
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
      const response = await fetch(`${apiUrl}/regions`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setRegions(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSources = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/sources`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setSources(data);
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
      const response = await fetch(`${apiUrl}/impacts`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setImpacts(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchThematicCategories = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/thematicCategories`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setThematicCategories(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "file" | "media") => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const maxFileSize = 5 * 1024 * 1024;
      if (file.size > maxFileSize) {
        setError("File size exceeds the maximum limit of 5 MB.");
        return;
      }

      const extension = file.name.split(".").pop()?.toLowerCase();
      const allowedImageExtensions = ["jpg", "png", "jpeg"];
      const allowedVideoExtensions = ["mp4", "avi"];
      const allowedPdfExtensions = ["pdf"];

      if (
        (field === "media" &&
          !allowedImageExtensions.includes(extension) &&
          !allowedVideoExtensions.includes(extension)) ||
        (field === "file" && !allowedPdfExtensions.includes(extension))
      ) {
        setError("Invalid file type. Please upload a valid file.");
        return;
      }

      setError(null);

      setFormData((prevData) => ({
        ...prevData,
        [field]: file,
      }));

      if (extension) {
        if (allowedImageExtensions.includes(extension)) {
          setFormData((prevData) => ({
            ...prevData,
            mediaType: "image",
          }));
        } else if (allowedVideoExtensions.includes(extension)) {
          setFormData((prevData) => ({
            ...prevData,
            mediaType: "video",
          }));
        } else if (allowedPdfExtensions.includes(extension)) {
          setFormData((prevData) => ({
            ...prevData,
            mediaType: "pdf",
          }));
        }
      }
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const formPayload = {
      ...formData,
      file: formData.file ? formData.file.name : null,
      media: formData.media ? formData.media.name : null,
      status: "PENDING",
    };

    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/authorityDecisions/${decisionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPayload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data updated successfully:", result);
        setFormData({
          title: "",
          city: "",
          region: "",
          source: "",
          file: null,
          media: null,
          mediaType: "",
          metrics: "",
          insight: "",
          impact: "",
          origin: "",
          date: "",
          geographicScope: "",
          thematicCategory: "",
          summary: ""
        });
        setSuccess("Legal Framework Updated Successfully!");
        setError(null);
        setLoading(false);
      } else {
        console.error("Error updating data", response);
        alert("There was an error updating the legal framework.");
      }
    } catch (error) {
      setSuccess(null);
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="Authoritative Decision Making"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
      >
        <Card
          title="Authoritative Decision Form"
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
                  label="Title of Authorative Decision"
                  placeholder="Title of Authorative Decision"
                  value={formData.title}
                  onChange={handleChange}
                  name="title"
                />
              </div>
              <div>
                <Input
                  type="select"
                  label="Geographic Scope"
                  placeholder="Geographic Scope"
                  value={formData.geographicScope}
                  onChange={handleChange}
                  name="geographicScope"
                >
                  <option value="">Select Geographic Scope</option>
                  {geographicScopes && geographicScopes.length > 0 ? (
                    geographicScopes.map((geographicScope, index) => (
                      <option key={index} value={geographicScope.id}>
                        {geographicScope.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No origins available</option>
                  )}
                </Input>
              </div>
              <div>
                <Input
                  type="select"
                  label="Source"
                  placeholder=" source"
                  value={formData.source}
                  onChange={handleChange}
                  name="source"
                >
                  <option value="">Select Source</option>
                  {sources.map((source, index) => (
                    <option key={index} value={source.id}>
                      {source.name}
                    </option>
                  ))}
                </Input>
              </div>

              <div>
                <Input
                  type="select"
                  label="Origin of the Authoritative Decision"
                  placeholder="Origin of the Authoritative Decision"
                  value={formData.origin}
                  onChange={handleChange}
                  name="origin"
                >
                  <option value="">Select Origin of Legal Framework</option>
                  {origins && origins.length > 0 ? (
                    origins.map((origin, index) => (
                      <option key={index} value={origin.id}>
                        {origin.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No origins available</option>
                  )}
                </Input>
              </div>


              <div>
                <Input
                  type="date"
                  label="Date"
                  placeholder="Select date"
                  value={formData.date}
                  onChange={handleChange}
                  name="date"
                />
              </div>
              <div>
                <Input
                  type="text"
                  label="City"
                  placeholder=" city"
                  value={formData.city}
                  onChange={handleChange}
                  name="city"
                />
              </div>
             
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  File Upload
                </label>
                <div className="mt-1">
                  <label
                    htmlFor="file"
                    className="inline-block cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Select File
                  </label>
                  <input
                    id="file"
                    type="file"
                    onChange={(e) => handleFileChange(e, "file")}
                    className="hidden"
                  />
                  {formData.file && (
                    <span className="text-sm text-gray-600 ml-2">
                      {formData.file.name}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Media Upload
                </label>
                <div className="mt-1">
                  <label
                    htmlFor="media"
                    className="inline-block cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Select Media
                  </label>
                  <input
                    id="media"
                    type="file"
                    onChange={(e) => handleFileChange(e, "media")}
                    className="hidden"
                  />
                  {formData.media && (
                    <span className="text-sm text-gray-600 ml-2">
                      {formData.media.name}
                    </span>
                  )}
                </div>
              </div>
     
              <div>
                <Input
                  type="select"
                  label="Region"
                  placeholder="Region"
                  value={formData.region}
                  onChange={handleChange}
                  name="region"
                >
                  <option value="">Select Regions</option>
                  {regions.map((region, index) => (
                    <option key={index} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </Input>
              </div>

           
              <div>
                <Input
                  type="select"
                  label="Metrics"
                  placeholder=" metrics"
                  value={formData.metrics}
                  onChange={handleChange}
                  name="metrics"
                >
                  <option value="">Select Metrics</option>
                  {metrics.map((metric, index) => (
                    <option key={index} value={metric.id}>
                      {metric.name}
                    </option>
                  ))}
                </Input>
              </div>
              <div>
                <Input
                  type="select"
                  label="Impact"
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
                  type="select"
                  label="Thematic Category"
                  placeholder="Thematic Category"
                  value={formData.thematicCategory}
                  onChange={handleChange}
                  name="thematicCategory"
                >
                  <option value="">Select Thematic Category</option>
                  {thematicCategories.map((thematicCategory, index) => (
                    <option key={index} value={thematicCategory.id}>
                      {thematicCategory.name}
                    </option>
                  ))}
                </Input>
              </div>
              <div>
                <Input
                  type="textarea"
                  label="Summary of Authoratice Decision"
                  placeholder="Summary of Authoratice Decision"
                  value={formData.summary}
                  onChange={handleChange}
                  name="summary"
                />
              </div>
              <div>
                <Input
                  type="textarea"
                  label="CEHRO's insight"
                  placeholder="CEHRO's insight"
                  value={formData.insight}
                  onChange={handleChange}
                  name="insight"
                />
              </div>
            </div>

            <div className="mt-4">
              <Button
                color="primary"
                text={loading ? "Saving..." : "Authorative Decision"}
                onClick={handleSubmit}
                icon={<FaPlus />}
                size="large"
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

export default AuthorityDecisionForm;
