"use client";

import Button from "@/app/components/UI/Button";
import Input from "@/app/components/UI/Input";
import { useState, useEffect } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useParams } from "next/navigation";
import Toast from "@/app/components/UI/Toast";

const UpdateUserPage = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [roles, setRoles] = useState<any[]>([]);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    fetchRoles();
    if (id) {
      const fetchUserData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${apiUrl}/users/${id}`);
          const data = await response.json();
          if (response.ok) {
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setUsername(data.username);
            setEmail(data.email);
            setPhoneNumber(data.phoneNumber);
            setRole(data.role); 
            } else {
            setError("Failed to fetch user data.");
          }
        } catch (error) {
          console.log(error);
          setError("Error fetching user data.");
        }
      };

      fetchUserData();
    }
  }, [id]);

  const fetchRoles = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/roles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data != null) {
        setRoles(data);
        setError(null);
      }
    } catch (error) {
      setError(error);
    }
  };

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
      case "role":
        setRole(value); 
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
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPhoneNumber("");
        setRole("")
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
    <div>
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="Update User"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
               <Input
                type="select"
                placeholder="Role"
                value={role}
                name="role"
                onChange={handleInputChange}
                borderRadius={1}
              >
                <option value="">Select Role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role.id}>{role.name}</option>
                ))}
              </Input>
            </div>

            <div className="mt-4 flex justify-between">
              <Button
                icon={<FaPlus />}
                color="primary"
                text={loading ? "Updating..." : "Update User"}
                elevation={3}
                onClick={handleUpdate}
                disabled={loading}
                size="large"
              />
            </div>

            {success && (
              <Toast
                message={success}
                type="success"
                position="top-right"
                onClose={() => setSuccess(null)}
              />
            )}

            {error && (
              <Toast
                message={error}
                type="error"
                position="top-right"
                onClose={() => setError(null)}
              />
            )}
          </form>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default UpdateUserPage;
