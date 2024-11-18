"use client";

import React, { useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";

type RegionFormData = {
  name: string;
  remark: string;
};

const CategoryForm = () => {
    const [formData, setFormData] = useState<RegionFormData>({
        name: "",
        remark: "",
      });
    
      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
      };
    
      return (
        <div className="bg-white pb-5">
          <BoxWrapper
            icon={<FaCalendar />}
            title="Category Maintenance"
            borderColor="border-primary"
            borderThickness="border-b-4"
          >
            <Card
              title="Category Form"
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
                <div className="flex flex-col space-y-4">
                  <div>
                    <Input
                      type="text"
                      label="Category Name"
                      placeholder="Enter Category Name"
                      value={formData.name}
                      onChange={handleChange}
                      name="name"
                      className="w-full"
                    />
                  </div>
    
                  <div>
                    <Input
                      type="textarea"
                      label="Remark"
                      placeholder="Enter Remark"
                      value={formData.remark}
                      onChange={handleChange}
                      name="remark"
                      borderRadius={3}
                      className="w-full"
                    />
                  </div>
                </div>
              </form>
            </Card>
          </BoxWrapper>
    
          <div className="flex justify-end mt-4 mr-24">
            <Button
              color="primary"
              text="Save Category"
              size="large"
              elevation={4}
            />
          </div>
        </div>
      );
    };
export default CategoryForm;
