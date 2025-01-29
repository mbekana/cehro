"use client";

import Button from "@/app/components/UI/Button";
import Input from "@/app/components/UI/Input";
import { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import Toast from "@/app/components/UI/Toast";

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [roles, setRoles] = useState<any[]>([]);

  // Only fetch roles for the dropdown (no form data fetching here)
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/roles/all`);
      const data = await response.json();
      if (data) setRoles(data.data);
    } catch (err) {
      setError("Failed to fetch roles");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    const { firstName, lastName, userName, email, password, confirmPassword, phone, role } = formData;

    setError(null);
    setSuccess(null);

    if (!firstName || !lastName || !userName || !email || !password || !confirmPassword || !phone) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const userData = { ...formData, role: role || null };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("User created successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          middleName:"",
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          role: "",
        });
      } else {
        setError(data.message || "Signup error.");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="User Signup"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
      >
        <Card
          title="Create Your Account"
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

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["firstName", "middleName", "lastName", "userName", "email", "phone"].map((field, index) => (
                <Input
                  key={index}
                  type={field === "email" ? "email" : field === "phone" ? "text" : "text"}
                  placeholder={field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  value={formData[field]}
                  name={field}
                  onChange={handleInputChange}
                />
              ))}

              <Input
                type="select"
                placeholder="Role"
                value={formData.role}
                name="role"
                onChange={handleInputChange}
                borderRadius={1}
              >
                <option value="">Select Role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role.role}>{role.role}</option>
                ))}
              </Input>

              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                name="password"
                onChange={handleInputChange}
              />
              <Input
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                name="confirmPassword"
                onChange={handleInputChange}
              />
            </div>

            <div className="mt-4 flex justify-between">
              <Button
                color="primary"
                text={loading ? "Creating..." : "Create User"}
                elevation={3}
                icon={<FaPlus />}
                onClick={handleSignup}
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

export default SignupPage;
