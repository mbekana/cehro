"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";  // Import useParams
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar, FaPlus } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";

type SocialMediaFormData = {
  assesementCategory: string;
  affectedArea: string;
  city: string;
  region: string;
  source: string;
  file: File | null;
  media: File | null;
  mediaType: string;
  metrics: string;
  remark: string;
  impact: string;
};

const SocialMediaEdit = () => {
  const { id } = useParams();  // Unwrap params using useParams hook
  const [formData, setFormData] = useState<SocialMediaFormData>({
    assesementCategory: "",
    affectedArea: "",
    city: "",
    region: "",
    source: "",
    file: null,
    media: null,
    mediaType: "",
    metrics: "",
    remark: "",
    impact: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [routerLoaded, setRouterLoaded] = useState<boolean>(false); 

  useEffect(() => {
    if (id) {
      setRouterLoaded(true);
      fetchSocialMediaData(Array.isArray(id) ? id[0] : id);  
    }
  }, [id]);  // Depend on `id`

  const fetchSocialMediaData = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/admin/api/test/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Data: ", data);
        setFormData({
          assesementCategory: data.assesementCategory || "",
          affectedArea: data.affectedArea || "",
          city: data.city || "",
          region: data.region || "",
          source: data.source || "",
          file: null,
          media: null,
          mediaType: data.mediaType || "",
          metrics: data.metrics || "",
          remark: data.remark || "",
          impact: data.impact || "",
        });
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
      if (extension === 'jpg' || extension === 'png' || extension === 'jpeg') {
        setFormData((prevData) => ({
          ...prevData,
          mediaType: 'image',
        }));
      } else if (extension === 'mp4' || extension === 'avi') {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formPayload = {
      ...formData,
      file: formData.file ? formData.file.name : null,
      media: formData.media ? formData.media.name : null,
    };

    try {
      const response = await fetch(`http://localhost:5000/socialMediaPosts/${id}`, {
        method: "PUT", // Update request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPayload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data updated successfully:", result);
        alert("Social Media Updated Successfully!");
      } else {
        console.error("Error updating data", response);
        alert("There was an error updating the social media data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the data.");
    }
  };

  if (!routerLoaded || loading) {
    return <div>Loading...</div>; // Wait until router is ready and data is fetched
  }

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaCalendar />}
        title="Edit Social Media"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Edit Social Media Form"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div>
                <Input
                  type="text"
                  label="Assessment Category"
                  placeholder="Enter assessment category"
                  value={formData.assesementCategory}
                  onChange={handleChange}
                  name="assesementCategory"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Affected Area"
                  placeholder="Enter affected area"
                  value={formData.affectedArea}
                  onChange={handleChange}
                  name="affectedArea"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="City"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                  name="city"
                />
              </div>

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
                  label="Source"
                  placeholder="Enter source"
                  value={formData.source}
                  onChange={handleChange}
                  name="source"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">File Upload</label>
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
                    onChange={(e) => handleFileChange(e, 'file')}
                    className="hidden"
                  />
                  {formData.file && <span className="text-sm text-gray-600 ml-2">{formData.file.name}</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Media Upload</label>
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
                    onChange={(e) => handleFileChange(e, 'media')}
                    className="hidden"
                  />
                  {formData.media && <span className="text-sm text-gray-600 ml-2">{formData.media.name}</span>}
                </div>
              </div>

              <div>
                <Input
                  type="text"
                  label="Metrics"
                  placeholder="Enter metrics"
                  value={formData.metrics}
                  onChange={handleChange}
                  name="metrics"
                />
              </div>

              <div>
                <Input
                  type="textarea"
                  label="Remark"
                  placeholder="Enter remark"
                  value={formData.remark}
                  onChange={handleChange}
                  name="remark"
                />
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
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Input>
              </div>
            </div>

            <div className="mt-4">
              <Button
                color="primary"
                text="Update Social Media"
                onClick={(e) => handleSubmit(e!)}
                icon={<FaPlus />}
                size="large"
              />
            </div>
          </form>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default SocialMediaEdit;
