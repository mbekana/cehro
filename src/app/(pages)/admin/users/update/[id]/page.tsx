"use client";

import Button from "@/app/components/UI/Button";
import Input from "@/app/components/UI/Input";
import { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import Toast from "@/app/components/UI/Toast";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";

const defaultPhoto = "/user.png";

const UpdatePage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    role: "",
    avatar: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [roles, setRoles] = useState<any[]>([]);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { id } = useParams();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    fetchRoles();
    fetchUserProfile();
  }, []);

  useEffect(() => {
    console.log("HI: ", Cookies.get("userData"));
    const user = Cookies.get("userData")
      ? JSON.parse(Cookies.get("userData")!)
      : null;
    setUserData(user);
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

  const fetchUserProfile = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/users/${id}`);
      const data = await response.json();
      if (data) {
        setFormData({
          firstName: data.data.firstName || "",
          middleName: data.data.middleName || "",
          lastName: data.data.lastName || "",
          userName: data.data.userName || "",
          email: data.data.email || "",
          phone: data.data.phone || "",
          role: data.data.role || "",
          avatar: null,
        });
        setAvatarPreview(data.data.avatar || defaultPhoto);
      }
    } catch (err) {
      setError("Failed to fetch user data");
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

  const handleUpdate = async () => {
    const { firstName, lastName, email, phone, role, avatar, userName } =
      formData;

    setError(null);
    setSuccess(null);

    if (!firstName || !lastName || !userName || !email || !phone) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address.");
      return;
    }

    setLoading(true);

    const updatedData = { ...formData, role: role || null };

    const formDataToSend = new FormData();
    Object.keys(updatedData).forEach((key) => {
      if (key !== "avatar") {
        formDataToSend.append(
          key,
          updatedData[key as keyof typeof updatedData]
        );
      }
    });

    if (avatar) formDataToSend.append("avatar", avatar);
    formDataToSend.append("updatedById", userData.id);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/users/${id}`, {
        method: "PATCH",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("User updated successfully!");
        setAvatarPreview(data.data.avatar || null);
      } else {
        setError(data.message || "Update error.");
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
        title="Update User Profile"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
      >
        <Card
          title="Edit Your Account"
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

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-gray-700 file:hover:bg-gray-200"
                />
                {avatarPreview && (
                  <div className="mt-3">
                    <div className="flex">
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="w-24 h-24 object-cover rounded-full shadow-md border-2 border-gray-200"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <Button
                color="primary"
                text={loading ? "Updating..." : "Save Changes"}
                elevation={3}
                icon={<FaSave />}
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

export default UpdatePage;
