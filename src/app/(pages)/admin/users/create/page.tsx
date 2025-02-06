"use client";

import Button from "@/app/components/UI/Button";
import Input from "@/app/components/UI/Input";
import { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import Toast from "@/app/components/UI/Toast";
import Cookies from "js-cookie";

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
    avatar: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [roles, setRoles] = useState<any[]>([]);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null); // For previewing the avatar image
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const user = Cookies.get("userData")
      ? JSON.parse(Cookies.get("userData")!)
      : null;
    setUser(user);
  }, []);

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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          avatar: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = async () => {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
      phone,
      role,
      avatar,
    } = formData;

    setError(null);
    setSuccess(null);

    if (
      !firstName ||
      !lastName ||
      !userName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone
    ) {
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

    const formDataToSend = new FormData();
    Object.keys(userData).forEach((key) => {
      if (key !== "confirmPassword") {
        formDataToSend.append(key, userData[key as keyof typeof userData]);
      }
    });

    formDataToSend.append("createdById", user?.id);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/api/v1/users/register`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("User created successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          middleName: "",
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          role: "",
          avatar: null,
        });
        setAvatarPreview(null);
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
              {[
                "firstName",
                "middleName",
                "lastName",
                "userName",
                "email",
                "phone",
              ].map((field, index) => (
                <Input
                  key={index}
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                      ? "text"
                      : "text"
                  }
                  placeholder={field.replace(/([A-Z])/g, " $1").toUpperCase()}
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
                  <option key={index} value={role.role}>
                    {role.role}
                  </option>
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

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md"
                />
                {avatarPreview && (
                  <div className="mt-2">
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-24 h-24 object-cover rounded-full"
                    />
                  </div>
                )}
              </div>
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
