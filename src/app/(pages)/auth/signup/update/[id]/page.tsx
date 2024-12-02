'use client';

import Button from "@/app/components/UI/Button";
import Input from "@/app/components/UI/Input";
import { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaUserEdit } from "react-icons/fa";
import { useParams } from "next/navigation";


const UpdateUserPage = () => {
const { id } = useParams();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/users/${id}`);
        const data = await response.json();
        if (response.ok) {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setUsername(data.username);
          setEmail(data.email);
          setPhoneNumber(data.phoneNumber);
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (error) {
        console.log(error)
        setError("Error fetching user data.");
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const updatedUser = { firstName, lastName, username, email, phoneNumber };

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      
      const data = await response.json();

      if (response.ok) {
        setSuccess("User updated successfully!");
        setFirstName(""); setLastName(""); setUsername(""); setEmail(""); setPhoneNumber("");
      } else {
        setError(data.message || "An error occurred while updating the user.");
      }
    } catch (err) {
      setError(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <BoxWrapper
        icon={<FaUserEdit />}
        title="Update User"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Update Your Account Information"
          borderColor="border-primary"
          borderThickness="border-1"
          bgColor="bg-white"
        >
          <Divider
            borderColor="border-gray-400"
            borderThickness="border-t-2"
            marginTop="mt-1"
            marginBottom="mb-6"
          />

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <Input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                name="firstName"
                onChange={handleInputChange}
              />
              <Input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                name="lastName"
                onChange={handleInputChange}
              />
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                name="username"
                onChange={handleInputChange}
              />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                name="email"
                onChange={handleInputChange}
              />
              <Input
                type="text"
                placeholder="Enter your phone number"
                value={phoneNumber}
                name="phoneNumber"
                onChange={handleInputChange}
                borderRadius={1}
              />
            </div>

            <div className="mt-4 flex justify-between">
              <Button
                color="primary"
                text={loading ? "Updating..." : "Update User"}
                elevation={3}
                onClick={handleUpdate}
                disabled={loading}
              />
            </div>

            {error && <div className="mt-4 text-red-500">{error}</div>}
            {success && <div className="mt-4 text-green-500">{success}</div>}
          </form>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default UpdateUserPage;
