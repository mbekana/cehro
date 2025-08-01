"use client";

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import Toast from "@/app/components/UI/Toast";
import Button from "@/app/components/UI/Button";
import { Role } from "@/app/model/Role";
import Cookies from "js-cookie";

const UserRoleForm = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    position: "top-right";
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [formData, setFormData] = useState<Role>({
    role: "",
    remark: "",
  });

  useEffect(() => {
    console.log("HI: ", Cookies.get("userData"));
    const user = Cookies.get("userData")
      ? JSON.parse(Cookies.get("userData")!)
      : null;
    setUserData(user);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
      const payload = { ...formData, createdById: userData?.id };
      const response = await fetch(`${apiUrl}/api/v1/roles/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create Role");
      }

      setFormData({
        role: "",
        remark: "",
      });

      setToast({
        message: "You have created occupation successfully.",
        type: "success",
        position: "top-right",
      });
    } catch (error) {
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
    <div className="bg-white pb-5">
      <BoxWrapper
        icon={<FaCalendar />}
        title="Role Maintenance"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="User Role Form"
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
            <div className="flex flex-col space-y-4">
              <div>
                <Input
                  type="text"
                  label="User Role Level"
                  placeholder="Enter Role"
                  value={formData.role}
                  onChange={handleChange}
                  name="role"
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
            <div className="flex justify-end mt-4 mr-24">
              <Button
                color="primary"
                text={loading ? "Saving" : "Save Education"}
                size="large"
                elevation={4}
                borderRadius={3}
                disabled={loading}
                onClick={handleSubmit}
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
export default UserRoleForm;
