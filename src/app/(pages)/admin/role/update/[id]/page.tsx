'use client';

import React, { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaUsers } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import { useParams, useRouter } from "next/navigation"; 

type UserRoleFormData = {
  name: string;
  remark: string;
};

const UpdateRolePage = () => {
  const { id } = useParams();
  const router = useRouter();
  
  const [role, setRole] = useState<any | null>(null);
  const [formData, setFormData] = useState<UserRoleFormData>({
    name: "",
    remark: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (id) {
      const fetchRoleData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${apiUrl}/roles/${id}`);
          if (response.ok) {
            const data = await response.json();
            setRole(data);
            setFormData({
              name: data.name,
              remark: data.remark,
            });
          } else {
            console.error("Role not found");
          }
        } catch (error) {
          console.error("Error fetching role data", error);
        }
      };

      fetchRoleData();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${apiUrl}/roles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      setSuccessMessage("Role updated successfully");
      setTimeout(() => {
        setSuccessMessage(null);
        router.push("/roles"); // Redirect to role list page after success
      }, 3000);
    } catch (error) {
      setError(`Error: ${error}`);
    }
  };

  if (!role) {
    return <div>Loading role data...</div>;
  }

  return (
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaUsers />}
        title="Update Role"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Update Role Form"
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

          <form  className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div>
                <Input
                  type="text"
                  label="Role Name"
                  placeholder="Enter Role Name"
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
                  className="w-full"
                />
              </div>
            </div>
          </form>
        </Card>
      </BoxWrapper>

      {successMessage && (
        <div className="mt-4 text-center text-green-500">{successMessage}</div>
      )}

      {error && <div className="mt-4 text-center text-red-500">{error}</div>}

      <div className="flex justify-end mt-4 mr-24">
        <Button
          color="primary"
          text="Save Changes"
          size="large"
          elevation={4}
          borderRadius={3} 
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default UpdateRolePage;
