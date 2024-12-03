"use client";

import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";

import { useParams } from "next/navigation";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
}

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchUserDetails = async () => {
        setLoading(true);
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${apiUrl}/users/${id}`);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
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
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                First Name
              </h3>
              <p className="text-gray-600">{user.firstName}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Last Name</h3>
              <p className="text-gray-600">{user.lastName}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Username</h3>
              <p className="text-gray-600">{user.username}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Email</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Phone Number
              </h3>
              <p className="text-gray-600">{user.phoneNumber}</p>
            </div>
          </div>
        )}
      </Card>
    </BoxWrapper>
  );
};

export default UserDetailPage;
