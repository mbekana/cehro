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
import { LegalFramework } from "@/app/model/LegalFramework";
import Cookies from "js-cookie";

const LegalFrameworkForm = () => {
  const { id } = useParams();
  const [metrics, setMetrics] = useState<any[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [userData, setUserData] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [origins, setOrigins] = useState<any[]>([]);
  const [geographicScopes, setGeographicsScopes] = useState<any[]>([]);
  const [thematicCategories, setThematicCategories] = useState<any[]>([]);
  const [filePreview, setFilePreview] = useState<any>(null);
  const [mediaType, setMediaType] = useState<any>(null);
  const [fileType, setFileType] = useState<any>(null);
  const [mediaPreview, setMediaPreview] = useState<any>(null);
  const [formData, setFormData] = useState<LegalFramework>({
    title: "",
    scope: "",
    origin: "",
    file: null,
    video: null,
    date: "",
    category: "",
    impact: "",
    source: "",
    region: "",
    woreda_kebele: "",
    zone_subcity: "",
    metrics: "",
    cehro_insights: "",
    status: "",
    postedBy: "",
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
    setGeographicsScopes(geographicScope);
    setThematicCategories(thematicCategories);
    if (id) {
      const fetchData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(
            `${apiUrl}/api/v1/legal-frameworks/${id}`
          );
          const data = await response.json();
          setFormData({
            title: data.data.title,
            zone_subcity: data.data.zone_subcity,
            region: data.data.region,
            source: data.data.source,
            file: data.data.file,
            video: data.data.video,
            metrics: data.data.metrics,
            cehro_insights: data.data.cehro_insights,
            impact: data.data.impact,
            origin: data.data.origin,
            date: data.data.date,
            scope: data.data.geographicScope,
            category: data.data.category,
            woreda_kebele: data.data.woreda_kebele,
            // summary: data.summary,
            // scope:data.scope
          });
          if (data.data.file) {
            setFilePreview(generateFilePreview(data.data.file)); 
            setFileType("pdf");
          }
          
          if (data.data.video) {
            setMediaPreview(generateFilePreview(data.data.video));
            setMediaType(data.data.video.split('.').pop()?.toLowerCase() === 'mp4' ? 'video' : 'image');
          }
  
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
      const response = await fetch(`${apiUrl}/api/v1/categories/all`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setThematicCategories(data.data);
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

  const getFileNameFromPath = (filePath: string, maxLength = 20): string => {
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

  const validateFile = (
    selectedFile: File,
    field: "file" | "media"
  ): string | null => {
    const maxFileSize = 5 * 1024 * 1024; // 5MB max
    if (selectedFile.size > maxFileSize) {
      return "File size exceeds the maximum limit of 5 MB.";
    }

    const extension = selectedFile.name.split(".").pop()?.toLowerCase();
    const allowedImageExtensions = ["jpg", "png", "jpeg"];
    const allowedVideoExtensions = ["mp4", "avi"];
    const allowedPdfExtensions = ["pdf"];

    if (
      (field === "media" &&
        !allowedImageExtensions.includes(extension) &&
        !allowedVideoExtensions.includes(extension)) ||
      (field === "file" && !allowedPdfExtensions.includes(extension))
    ) {
      return "Invalid file type. Please upload a valid file.";
    }

    return null;
  };

  const generateFilePreview = (selectedFile: File): string => {
    return URL.createObjectURL(selectedFile);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "file" | "media"
  ) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      const fileError = validateFile(selectedFile, field);
      if (fileError) {
        return;
      }

      const filePreview = generateFilePreview(selectedFile);

      setFormData((prevData) => {
        const updatedData: any = { ...prevData };
        if (field === "file") {
          updatedData[field] = selectedFile;
        } else {
          updatedData["video"] = selectedFile;
        }

        if (field === "media") {
          setMediaPreview(filePreview);
          const mediaType = selectedFile.type.includes("image")
            ? "image"
            : selectedFile.type.includes("video")
            ? "video"
            : "";
          setMediaType(mediaType);
        } else if (field === "file") {
          setFilePreview(filePreview);
          setFileType("pdf");
        }

        return updatedData;
      });
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);

    // Create a new FormData object
    const formDataObj = new FormData();

    // Append form data (excluding files)
    formDataObj.append("title", formData.title);
    formDataObj.append("scope", formData.scope);
    formDataObj.append("origin", formData.origin);
    formDataObj.append("date", formData.date);
    formDataObj.append("category", formData.category);
    formDataObj.append("impact", formData.impact);
    formDataObj.append("source", formData.source);
    formDataObj.append("region", formData.region);
    formDataObj.append("woreda_kebele", formData.woreda_kebele);
    formDataObj.append("zone_subcity", formData.zone_subcity);
    formDataObj.append("metrics", formData.metrics);
    formDataObj.append("cehro_insights", formData.cehro_insights);
    formDataObj.append("status", formData.status);
    formDataObj.append("approvedById", userData.id);

    // Append files (if present)
    if (formData.file) {
      formDataObj.append("file", formData.file);
    }

    if (formData.video) {
      formDataObj.append("media", formData.video);
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/legal-frameworks/${id}`, {
        method: "PUT",
        body: formDataObj, // Send FormData directly, no need to stringify
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data saved successfully:", result);
        setFormData({
          title: "",
          scope: "",
          origin: "",
          file: null,
          video: null,
          date: "",
          category: "",
          impact: "",
          source: "",
          region: "",
          woreda_kebele: "",
          zone_subcity: "",
          metrics: "",
          cehro_insights: "",
          status: "",
          postedBy: "",
        });
        setToast({
          message: "Legal Framework Saved Successfully",
          type: "success",
          position: "top-right",
        });
      } else {
        setToast({
          message: "There was an error saving the legal framework",
          type: "error",
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setToast({
        message: `${error.message}`,
        type: "error",
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-5">
                        <span>{}</span>

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
                  value={formData.scope}
                  onChange={handleChange}
                  name="scope"
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
                  value={formData.zone_subcity}
                  onChange={handleChange}
                  name="zone_subcity"
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
                    <option key={index} value={source.source}>
                      {source.source}
                    </option>
                  ))}
                </Input>
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
                  {filePreview  && (
                    <embed src={filePreview} width="200" height="200" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Media Upload
                </label>
                <div className="mt-1">
             
                  <input
                    id="media"
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => handleFileChange(e, "media")}
                    className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-gray-700 file:hover:bg-gray-200"

                  />
           {mediaPreview && mediaType === "image" && (
                    <img
                      src={mediaPreview}
                      alt="Preview"
                      style={{ width: "100px", height: "auto" }}
                    />
                  )}
                  {mediaPreview && mediaType === "video" && (
                    <video width="200" controls>
                      <source src={mediaPreview} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
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
                    <option key={index} value={metric.metrics}>
                      {metric.metrics}
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

              <div>
                <Input
                  type="select"
                  label="Thematic Category"
                  placeholder="Thematic Category"
                  value={formData.category}
                  onChange={handleChange}
                  name="category"
                >
                  <option value="">Select Thematic Category</option>
                  {thematicCategories.map((thematicCategory, index) => (
                    <option key={index} value={thematicCategory.category}>
                      {thematicCategory.category}
                    </option>
                  ))}
                </Input>
              </div>
              {/* <div>
                <Input
                  type="textarea"
                  label="Summary of Legal Framerwork"
                  placeholder="Summary of Legal Framerwork"
                  value={formData.summary}
                  onChange={handleChange}
                  name="summary"
                />
              </div> */}
              <div>
                <Input
                  type="textarea"
                  label="CEHRO's insight"
                  placeholder="CEHRO's insight"
                  value={formData.cehro_insights}
                  onChange={handleChange}
                  name="cehro_insights"
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

export default LegalFrameworkForm;
