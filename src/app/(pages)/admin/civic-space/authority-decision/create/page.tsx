"use client";

import React, { useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar, FaPlus } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";

type AuthorityDecisionFormData = {
  decisionCategory: string;
  decisionArea: string;
  decisionRegion: string;
  sourceOfDecision: string;
  decisionFile: File | null;
  media: File | null;
  mediaType: string;
  decisionMetrics: string;
  decisionRemark: string;
  decisionImpact: string;
};

const AuthorityDecisionForm = () => {
  const [formData, setFormData] = useState<AuthorityDecisionFormData>({
    decisionCategory: "",
    decisionArea: "",
    decisionRegion: "",
    sourceOfDecision: "",
    decisionFile: null,
    media: null,
    mediaType: "",
    decisionMetrics: "",
    decisionRemark: "",
    decisionImpact: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'decisionFile' | 'media') => {
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
    e?.preventDefault();  // Safely handle event if it's passed

    const formPayload = {
      ...formData,
      decisionFile: formData.decisionFile ? formData.decisionFile.name : null,
      media: formData.media ? formData.media.name : null,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/authorityDecisions`, {
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
          decisionRegion: "",
          sourceOfDecision: "",
          decisionFile: null,
          media: null,
          mediaType: "",
          decisionMetrics: "",
          decisionRemark: "",
          decisionImpact: "",
        });
        alert("Authority Decision Saved Successfully!");
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
        title="Authority Decision Maintenance"
        borderColor="border-primary"
        borderThickness="border-b-4"
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
                  label="Decision Region"
                  placeholder="Enter decision region"
                  value={formData.decisionRegion}
                  onChange={handleChange}
                  name="decisionRegion"
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Source of Decision"
                  placeholder="Enter source of decision"
                  value={formData.sourceOfDecision}
                  onChange={handleChange}
                  name="sourceOfDecision"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">File Upload</label>
                <div className="mt-1">
                  <label
                    htmlFor="decisionFile"
                    className="inline-block cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Select File
                  </label>
                  <input
                    id="decisionFile"
                    type="file"
                    onChange={(e) => handleFileChange(e, 'decisionFile')}
                    className="hidden"
                  />
                  {formData.decisionFile && <span className="text-sm text-gray-600 ml-2">{formData.decisionFile.name}</span>}
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
                  label="Decision Metrics"
                  placeholder="Enter decision metrics"
                  value={formData.decisionMetrics}
                  onChange={handleChange}
                  name="decisionMetrics"
                />
              </div>

              <div>
                <Input
                  type="textarea"
                  label="Remark"
                  placeholder="Enter remark"
                  value={formData.decisionRemark}
                  onChange={handleChange}
                  name="decisionRemark"
                />
              </div>

              <div>
                <Input
                  type="select"
                  label="Impact"
                  value={formData.decisionImpact}
                  onChange={handleChange}
                  name="decisionImpact"
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
                text="Save Authority Decision"
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

export default AuthorityDecisionForm;
