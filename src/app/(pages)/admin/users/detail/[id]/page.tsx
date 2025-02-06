"use client";

import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import Toast from "@/app/components/UI/Toast";

import { useParams } from "next/navigation";
import { User } from "@/app/model/user";

const defaultPhoto = "/user.png";

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [disableStatus, setDisableStatus] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
    position:
      | "top-left"
      | "top-right"
      | "bottom-left"
      | "bottom-right"
      | "center";
  } | null>(null);

  useEffect(() => {
    if (id) {
      const fetchUserDetails = async () => {
        setLoading(true);
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${apiUrl}/api/v1/users/${id}`);
          if (response.ok) {
            const data = await response.json();
            setUser(data.data);
            console.log("DATA: ", data.data)
            setDisableStatus(data.data.disabled);
          } else {
            setError("User not found");
          }
        } catch (err) {
          setError(`Error fetching user: ${err}`);
        } finally {
          setLoading(false);
        }
      };
      fetchUserDetails();
    }
  }, [id]);

  const handleDisableToggle = async () => {
    const updatedStatus = !disableStatus;
    setDisableStatus(updatedStatus);
  
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          disabled: updatedStatus,
        }),
      });
  
      if (response.ok) {
        setUser((prevUser) =>
          prevUser ? { ...prevUser, disabled: updatedStatus } : null
        );
        setToast({
          message: `User ${
            updatedStatus ? "disabled" : "enabled"
          } successfully`,
          type: "success",
          position: "top-right",
        });
      } else {
        setDisableStatus(!updatedStatus);
        setToast({
          message: "Failed to update user status. Please try again.",
          type: "error",
          position: "top-right",
        });
      }
    } catch (err) {
      setDisableStatus(!updatedStatus);
      setToast({
        message: `Error updating user status: ${err}`,
        type: "error",
        position: "top-right",
      });
    }
  };
  
  const closeToast = () => setToast(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          position={toast.position}
          onClose={closeToast}
        />
      )}
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="User Details"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
      >
        <Card
          title="User Information"
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

          {user && (
            <div className="space-y-6">
              <div className="flex items-center justify-between space-x-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-700">
                    {user.firstName} {user.middleName} {user.lastName}
                  </h3>
                  <p className="text-gray-600">{user.userName}</p>
                </div>
                <div className="text-center">
                  <img
                    src={user?.avatar || defaultPhoto}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-20 h-20 rounded-full object-cover mx-auto"
                  />
                  <p className="mt-2 text-lg font-semibold text-gray-700">
                    {user.firstName} {user.middleName} {user.lastName}
                  </p>
                  <div className="flex items-center justify-center space-x-3 mt-4">
                    {/* User Status Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!disableStatus}
                        onChange={handleDisableToggle}
                        className="sr-only"
                      />
                      <div
                        className={`w-11 h-6 rounded-full transition-all duration-300 ease-in-out ${
                          disableStatus ? "bg-gray-200" : "bg-green-500"
                        }`}
                      ></div>
                      <span
                        className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${
                          disableStatus ? "" : "transform translate-x-5"
                        }`}
                      ></span>
                    </label>
                    <span className="text-gray-600">
                      {disableStatus ? "Disabled" : "Enabled"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Email
                    </h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Phone Number
                    </h3>
                    <p className="text-gray-600">{user.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Created At
                    </h3>
                    <p className="text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      First Name
                    </h3>
                    <p className="text-gray-600">{user.firstName}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Middle Name
                    </h3>
                    <p className="text-gray-600">{user.middleName}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Last Name
                    </h3>
                    <p className="text-gray-600">{user.lastName}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </BoxWrapper>
    </>
  );
};

export default UserDetailPage;
