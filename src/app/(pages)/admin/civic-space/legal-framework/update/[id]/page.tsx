"use client";

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar, FaPlus } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation";

type LegalFrameworkFormData = {
  assesementCategory: string;
  affectedArea: string;
  city: string;
  region: string;
  source: string;
  file: any ;
  media: any;
  mediaType: string;
  metrics: string;
  remark: string;
  impact: string;
};

// type LegalFrameworkFormProps = {
//   id?: string; // Optional ID to edit existing data
// };

const LegalFrameworkForm = () => {
  const {id} = useParams()
  const [formData, setFormData] = useState<LegalFrameworkFormData>({
    assesementCategory: "",
    affectedArea: "",
    city: "",
    region: "",
    source: "",
    file: "",
    media: "",
    mediaType: "",
    metrics: "",
    remark: "",
    impact: "",
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

          const response = await fetch(`${apiUrl}/legalFrameworks/${id}`);
          const data = await response.json();
          setFormData({
            assesementCategory: data.assesementCategory,
            affectedArea: data.affectedArea,
            city: data.city,
            region: data.region,
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

  const getFileNameFromPath = (filePath: string, maxLength: number = 20): string => {
    const fileName = filePath.split('/').pop()?.split('\\').pop() || '';
  
    if (fileName.length > maxLength) {
      return fileName.slice(0, maxLength) + '...';
    }
  
    return fileName;
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

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const formPayload = {
      ...formData,
      file: formData.file ? formData.file.name : null,
      media: formData.media ? formData.media.name : null,
    };

    try {
      const response = id
        ? await fetch(`http://localhost:5000/legalFrameworks/${id}`, {
            method: "PUT", // Use PUT for updating
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formPayload),
          })
        : await fetch("http://localhost:5000/legalFrameworks", {
            method: "POST", // Use POST for creating new entry
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formPayload),
          });

      if (response.ok) {
        const result = await response.json();
        console.log("Data saved successfully:", result);
        setFormData({
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
        alert(id ? "Legal Framework Updated Successfully!" : "Legal Framework Saved Successfully!");
      } else {
        console.error("Error saving data", response);
        alert("There was an error saving the legal framework.");
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
        title={id ? "Edit Legal Framework" : "Legal Framework Maintenance"}
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title={id ? "Edit Legal Framework" : "Legal Framework Form"}
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
                text={id ? "Update Legal Framework" : "Legal Framework"}
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

export default LegalFrameworkForm;
