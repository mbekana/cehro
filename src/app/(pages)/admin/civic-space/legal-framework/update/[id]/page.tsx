"use client";

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation";
import { Impact } from "@/app/model/Impact";
import Toast from "@/app/components/UI/Toast";

type LegalFrameworkFormData = {
  title: string;
  city: string;
  region: string;
  source: string;
  file: any;
  media: any;
  mediaType: string;
  metrics: string;
  insight: string;
  impact: string;
  origin: string;
  date: string;
  geographicScope: string;
  thematicCategory: string;
  summary: string;
};

const LegalFrameworkForm = () => {
  const { id } = useParams();
  const [metrics, setMetrics] = useState<any[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [origins, setOrigins] = useState<any[]>([]);
  const [geographicScopes, setGeographicsScopes] = useState<any[]>([]);
  const [thematicCategories, setThematicCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState<LegalFrameworkFormData>({
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
    summary: "",
  });

  useEffect(() => {
    fetchMetrics();
    fetchRegions();
    fetchSources();
    fetchImpacts();
    fetchThematicCategories();
    const origs = [
      { id: 1, name: "New" },
      { id: 2, name: "Revised" },
    ];

    const geographicScope = [
      { id: 1, name: "National" },
      { id: 2, name: "Regional" },
    ];

    setOrigins(origs);
    setGeographicsScopes(geographicScope)
    setThematicCategories(thematicCategories)
    if (id) {
      const fetchData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${apiUrl}/legalFrameworks/${id}`);
          const data = await response.json();
          setFormData({
            title: data.title,
            city: data.city,
            region: data.region,
            source: data.source,
            file: data.file ? { name: getFileNameFromPath(data.file) } : null,
            media: data.media ? { name: getFileNameFromPath(data.media) } : null,
            mediaType: data.mediaType,
            metrics: data.metrics,
            insight: data.remark,
            impact: data.impact,
            origin: data.origin,
            date: data.date,
            geographicScope: data.geographicScope,
            thematicCategory: data.thematicCategory,
            summary: data.summary,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [id]);

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

  const getFileNameFromPath = (
    filePath: string,
    maxLength: number = 20
  ): string => {
    const fileName = filePath.split("/").pop()?.split("\\").pop() || "";

    if (fileName.length > maxLength) {
      return fileName.slice(0, maxLength) + "...";
    }

    return fileName;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "file" | "media"
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      [field]: file,
    }));

    if (file) {
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (extension === "jpg" || extension === "png" || extension === "jpeg") {
        setFormData((prevData) => ({
          ...prevData,
          mediaType: "image",
        }));
      } else if (extension === "mp4" || extension === "avi") {
        setFormData((prevData) => ({
          ...prevData,
          mediaType: "video",
        }));
      } else if (extension === "pdf") {
        setFormData((prevData) => ({
          ...prevData,
          mediaType: "pdf",
        }));
      }
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    const formPayload = {
      ...formData,
      file: formData.file ? formData.file.name : null,
      media: formData.media ? formData.media.name : null,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = id
        ? await fetch(`${apiUrl}/legalFrameworks/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formPayload),
          })
        : await fetch(`${apiUrl}/legalFrameworks`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formPayload),
          });

      if (response.ok) {
        const result = await response.json();
        console.log("Data saved successfully:", result);
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
          summary: "",
        });
        setSuccess("Legal Framework Saved Successfully!");
        setError(null);
        setLoading(false);
      } else {
        setSuccess(null);
        setError("An error occurred while saving the data.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccess(null);
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="Legal Framework Maintenance"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
      >
        <Card
          title="Legal Framework Form"
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
                  label="Title of Legal Framework"
                  placeholder="Title of Legal Framework"
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
                  label="Origin of the Legal Framework"
                  placeholder="Origin of the Legal Framework"
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
                  label="Summary of Legal Framerwork"
                  placeholder="Summary of Legal Framerwork"
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
                text={loading ? "Saving..." : "Legal Framework"}
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

export default LegalFrameworkForm;

