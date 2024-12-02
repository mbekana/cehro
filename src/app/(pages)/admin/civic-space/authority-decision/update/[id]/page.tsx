"use client";

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar, FaPlus } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation";

// Type definition for the Authority Decision form data
type AuthorityDecisionFormData = {
  decisionCategory: string;
  decisionArea: string;
  decisionCity: string;
  decisionRegion: string;
  source: string;
  file: any;
  media: any;
  mediaType: string;
  metrics: string;
  remark: string;
  impact: string;
};

const UpdateAuthorityDecision = () => {
  const { id } = useParams(); // Get the ID from the URL parameters (for edit)
  const [formData, setFormData] = useState<AuthorityDecisionFormData>({
    decisionCategory: "",
    decisionArea: "",
    decisionCity: "",
    decisionRegion: "",
    source: "",
    file: null,
    media: null,
    mediaType: "",
    metrics: "",
    remark: "",
    impact: "",
  });

  // Fetch existing data if ID is provided (for editing an existing decision)
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/authorityDecisions/${id}`);
          const data = await response.json();
          setFormData({
            decisionCategory: data.decisionCategory,
            decisionArea: data.decisionArea,
            decisionCity: data.decisionCity,
            decisionRegion: data.decisionRegion,
            source: data.source,
            file: data.file ? { name: getFileNameFromPath(data.file) } : null,
            media: data.media ? { name: getFileNameFromPath(data.media) } : null,
            mediaType: data.mediaType,
            metrics: data.metrics,
            remark: data.remark,
            impact: data.impact,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  // Helper function to extract file name from path
  const getFileNameFromPath = (filePath: string, maxLength: number = 20): string => {
    const fileName = filePath.split('/').pop()?.split('\\').pop() || '';
    return fileName.length > maxLength ? fileName.slice(0, maxLength) + '...' : fileName;
  };

  // Handle changes in form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file/media selection
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

  // Handle form submission (create or update an Authority Decision)
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const formPayload = {
      ...formData,
      file: formData.file ? formData.file.name : null,
      media: formData.media ? formData.media.name : null,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = id
        ? await fetch(`${apiUrl}/authorityDecisions/authorityDecisions/${id}`, {
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
          decisionCategory: "",
          decisionArea: "",
          decisionCity: "",
          decisionRegion: "",
          source: "",
          file: null,
          media: null,
          mediaType: "",
          metrics: "",
          remark: "",
          impact: "",
        });
        alert(id ? "Authority Decision Updated Successfully!" : "Authority Decision Saved Successfully!");
      } else {
        console.error("Error saving data", response);
        alert("There was an error saving the authority decision.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the data.");
    }
  };

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaCalendar />}
        title={id ? "Edit Authority Decision" : "Authority Decision Maintenance"}
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title={id ? "Edit Authority Decision" : "Authority Decision Form"}
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
                  label="Decision Category"
                  placeholder="Enter decision category"
                  value={formData.decisionCategory}
                  onChange={handleChange}
                  name="decisionCategory"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Decision Area"
                  placeholder="Enter decision area"
                  value={formData.decisionArea}
                  onChange={handleChange}
                  name="decisionArea"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="City"
                  placeholder="Enter city"
                  value={formData.decisionCity}
                  onChange={handleChange}
                  name="decisionCity"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Region"
                  placeholder="Enter region"
                  value={formData.decisionRegion}
                  onChange={handleChange}
                  name="decisionRegion"
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
                text={id ? "Update Authority Decision" : "Create Authority Decision"}
                onClick={handleSubmit}
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

export default UpdateAuthorityDecision;
