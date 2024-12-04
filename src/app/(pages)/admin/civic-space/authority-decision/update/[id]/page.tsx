"use client";

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft,  FaPlus } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation";
import Toast from "@/app/components/UI/Toast";
import { Impact } from "@/app/model/Impact";


type AuthorityDecisionData = {
  affectedArea: string;
  city: string;
  region: string;
  source: string;
  file: File;
  media: File;
  mediaType?: string;
  metrics: string;
  insight: string;
  impact: string;
};

const UpdateAuthorityDecision = () => {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [metrics, setMetrics] = useState<any[]>([]);
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);

  const [formData, setFormData] = useState<AuthorityDecisionData>({
    affectedArea: "",
    region: "",
    source: "",
    file: null,
    media: null,
    mediaType: "",
    metrics: "",
    insight: "",
    impact: "",
    city: "",
  });

  useEffect(() => {
    fetchMetrics();
    fetchImpacts();
    fetchSources();
    fetchRegions();
    if (id) {
      const fetchData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

          const response = await fetch(`${apiUrl}/authorityDecisions/${id}`, {method:'GET'});
          const data = await response.json();
          setFormData({
            affectedArea: data.affectedArea,
            city:data.city,
            region: data.region,
            source: data.source,
            file: data.file,
            media: data.media,
            mediaType: data.mediaType,
            metrics: data.metrics,
            insight: data.insight,
            impact: data.impact,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [id]);


  const fetchMetrics = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/metrics`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
        console.log("Metrics: ", metrics);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
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

  // const getFileNameFromPath = (filePath: string, maxLength: number = 20): string => {
  //   const fileName = filePath.split('/').pop()?.split('\\').pop() || '';
  //   return fileName.length > maxLength ? fileName.slice(0, maxLength) + '...' : fileName;
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'file' | 'media') => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      [field]: file,
    }));

    if (file) {
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (['jpg', 'png', 'jpeg'].includes(extension || '')) {
        setFormData((prevData) => ({
          ...prevData,
          mediaType: 'image',
        }));
      } else if (['mp4', 'avi'].includes(extension || '')) {
        setFormData((prevData) => ({
          ...prevData,
          mediaType: 'video',
        }));
      } else if (extension === 'pdf') {
        setFormData((prevData) => ({
          ...prevData,
          mediaType: 'pdf',
        }));
      }
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    const formPayload = {
      ...formData,
      decisionFile: formData?.file ? formData.file.name : null,
      decisionMedia: formData.media ? formData.media.name : null,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = id
        ? await fetch(`${apiUrl}/authorityDecisions/${id}`, {
            method: "PUT", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formPayload),
          })
        : await fetch(`${apiUrl}/authorityDecisions`, {
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
          affectedArea: "",
          region: "",
          source: "",
          file: null,
          media: null,
          mediaType: "",
          metrics: "",
          insight: "",
          impact: "",
          city: "",
        });
        setLoading(false)
        setSuccess("Authority Decision Updated Successfully");
        setError(null);
      } else {
        console.error("Error saving data", response);
        setLoading(false)
        setSuccess(null);
        setError("There was an error saving the authority decision.");
      }
    } catch (error) {
      setLoading(false)
      setSuccess(null);
      setError(error);
    }
  };

 return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="Authority Decision Maintenance"
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

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  label="Affected Area"
                  placeholder="Affected Area"
                  value={formData.affectedArea}
                  onChange={handleChange}
                  name="affectedArea"
                />
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
                  label="City"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  name="city"
                />
              </div>
              <div>
                <Input
                  type="select"
                  label="Source of Decision"
                  placeholder="Source of decision"
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
                  label="Impact"
                  placeholder="Impact"
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
                  label="Metrics"
                  placeholder=" Metrics"
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
                      {formData.file?.name}
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
                  type="textarea"
                  label="CEHRO's Insight "
                  placeholder="CEHRO's Insight "
                  value={formData.insight}
                  onChange={handleChange}
                  name="insight"
                />
              </div>
            </div>

            <div className="mt-4">
              <Button
                color="primary"
                text={loading ? "Saving... " : "Authority Decision"}
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

export default UpdateAuthorityDecision;
