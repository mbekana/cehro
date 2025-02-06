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
import Cookies from "js-cookie";
import { AuthorityDecision } from "@/app/model/AuthorityDecision";

const AuthorityDecisionForm = () => {
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sources, setSources] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    position: "top-right";
  } | null>(null);

  const [formData, setFormData] = useState<AuthorityDecision>({
    title: "",
    scope: "",
    file: null,
    video: null,
    region: "",
    date: null,
    origin: "",
    impact: "",
    woreda_kebele: "",
    zone_subcity: "",
    metrics: "",
    category: "",
    source: "",
    summary: "",
    cehro_insights: "",
  });

  useEffect(() => {
    fetchMetrics();
    fetchImpacts();
    fetchRegions();
    fetchSources();
    fetchThematicCategories()
  }, []);

  useEffect(() => {
    console.log("HI: ", Cookies.get("userData"));
    const user = Cookies.get("userData")
      ? JSON.parse(Cookies.get("userData")!)
      : null;
    setUserData(user);
  }, []);

  const fetchSources = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/sources/all`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setSources(data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const fetchThematicCategories = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/thematic-categories/all`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
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
    field: "file" | "video"
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
        }));
      } else if (extension === "mp4" || extension === "avi") {
        setFormData((prevData) => ({
          ...prevData,
        }));
      } else if (extension === "pdf") {
        setFormData((prevData) => ({
          ...prevData,
        }));
      }
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (
      !formData.title ||
      !formData.date ||
      !formData.impact ||
      !formData.region ||
      !formData.source
    ) {
      setToast({
        message: "Please fill in all required fields.",
        type: "error",
        position: "top-right",
      });
      return;
    }

    const formPayload = new FormData();

    formPayload.append("title", formData.title);
    formPayload.append("date", formData.date);
    formPayload.append("impact", formData.impact);
    formPayload.append("region", formData.region);
    formPayload.append("origin", formData.origin);
    formPayload.append("woreda_kebele", formData.woreda_kebele);
    formPayload.append("zone_subcity", formData.zone_subcity);
    formPayload.append("metrics", formData.metrics);
    formPayload.append("category", formData.category);  
    formPayload.append("scope", formData.scope);  
    formPayload.append("summary", formData.summary);    
    formPayload.append("cehro_insights", formData.cehro_insights);
    formPayload.append("source", formData.source);
    formPayload.append("status", "PENDING");
    formPayload.append("postedById", userData?.id);
    

    if (formData.file) {
      formPayload.append("file", formData.file);
    }
    if (formData.video) {
      formPayload.append("video", formData.video);
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/authorative-decisions/register`, {
        method: "POST",
        body: formPayload,
      });

      if (response.ok) {
        const result = await response.json();
        setFormData({
          title: "",
          scope: "",
          file: null,
          video: null,
          region: "",
          date: null,
          origin: "",
          impact: "",
          woreda_kebele: "",
          zone_subcity: "",
          metrics: "",
          category: "",
          source: "",
          summary: "",
          cehro_insights: "",
        });
        setToast({
          message: "You have submitted data successfully.",
          type: "success",
          position: "top-right",
        });
      } else {
        throw new Error("Failed to submit data.");
      }
    } catch (error) {
      setToast({
        message:
          error.message || "An error occurred while submitting the form.",
        type: "error",
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderFilePreview = (file: File | null) => {
    if (!file) return null;

    const fileUrl = URL.createObjectURL(file);

    if (file.type.startsWith("image/")) {
      return (
        <img
          src={fileUrl}
          alt="preview"
          className="mt-2 w-32 h-32 object-cover"
        />
      );
    }

    if (file.type.startsWith("video/")) {
      return (
        <video controls className="mt-2 w-32 h-32">
          <source src={fileUrl} />
        </video>
      );
    }

    if (file.type === "application/pdf") {
      return (
        <div className="mt-2 w-32 h-32 overflow-auto">
          <iframe
            src={fileUrl}
            title="pdf preview"
            className="w-full h-full"
          ></iframe>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="pb-5">
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="Authority Decision"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
      >
        <Card
          title="Authority Decision Form"
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
                  label="Title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  name="title"
                />
              </div>
              <div>
                <Input
                  type="text"
                  label="Scope"
                  placeholder="Scope"
                  value={formData.scope}
                  onChange={handleChange}
                  name="scope"
                />
              </div>
              <div>
                <Input
                  type="text"
                  label="Origin"
                  placeholder="Origin"
                  value={formData.origin}
                  onChange={handleChange}
                  name="origin"
                />
              </div>
              <div>
                <Input
                  type="date"
                  label="Date"
                  placeholder="Date"
                  value={formData.date}
                  onChange={handleChange}
                  name="date"
                />
              </div>
              <div>
                <Input
                  type="text"
                  label="Woreda/kebele"
                  placeholder="Woreda/Kebele"
                  value={formData.woreda_kebele}
                  onChange={handleChange}
                  name="woreda_kebele"
                />
              </div>
              <div>
                <Input
                  type="text"
                  label="Zone/Subcity"
                  placeholder="Zone/Subcity"
                  value={formData.zone_subcity}
                  onChange={handleChange}
                  name="zone_subcity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  File Upload
                </label>
                <div className="mt-1">
              
                  <input
                    id="file"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, "file")}
                    className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-gray-700 file:hover:bg-gray-200"
                  />
                  {formData.file && (
                    <span className="text-sm text-gray-600 ml-2">
                      {formData.file.name}
                    </span>
                  )}
                </div>
                {renderFilePreview(formData.file)}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Media Upload
                </label>
                <div className="mt-1">
                  <input
                    id="video"
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => handleFileChange(e, "video")}
                    className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-gray-700 file:hover:bg-gray-200"
                    />
                  {formData.video && (
                    <span className="text-sm text-gray-600 ml-2">
                      {formData.video.name}
                    </span>
                  )}
                </div>
                {renderFilePreview(formData.video)}
              </div>
              <div>
                <Input
                  type="select"
                  label="Thematic Category"
                  value={formData.category}
                  onChange={handleChange}
                  name="category"
                >
                  <option value="">Select Thematic Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.category}>
                      {category.category}
                    </option>
                  ))}
                </Input>
              </div>
              <div>
                <Input
                  type="select"
                  label="Source"
                  placeholder="Source"
                  value={formData.source}
                  onChange={handleChange}
                  name="source"
                >
                  <option value="">Select Source</option>
                  {sources.map((source, index) => (
                    <option key={index} value={source.source}>
                      {source.source}
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
                    <option key={index} value={metric.metrics}>
                      {metric.metrics}
                    </option>
                  ))}
                </Input>
              </div>

              <div>
                <Input
                  type="select"
                  label="Region"
                  placeholder=" region"
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
                  type="select"
                  label="Impact"
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
            </div>
            <div>
              <Input
                type="textarea"
                label="Summary"
                placeholder="Summary"
                value={formData.summary}
                onChange={handleChange}
                name="summary"
              />
            </div>
            <div>
              <Input
                type="textarea"
                label="CEHOR's insight"
                placeholder="CEHOR's insight"
                value={formData.cehro_insights}
                onChange={handleChange}
                name="cehro_insights"
              />
            </div>
            <div className="flex justify-end mt-4 mr-24">
              {" "}
              <Button
                color="primary"
                text={loading ? "Saving..." : "Authority Decision"}
                onClick={handleSubmit}
                icon={<FaPlus />}
                size="large"
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

export default AuthorityDecisionForm;
