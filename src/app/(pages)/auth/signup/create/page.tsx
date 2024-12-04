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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [roles, setRoles] = useState<any[]>([]);
  const [role, setRole] = useState<string>("");


  useEffect(()=>{
    fetchRoles()
  }, [])

  const fetchRoles = async() =>{
    try{
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/roles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      const data = await response.json();
      if(data != null){
        setRoles(data)
        setError(null)
      }
    }catch(error){
      setError(error)
    }
  }

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
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "role":
        setRole(value);
      default:
        break;
    }
  };

  const handleSignup = async () => {
    setError(null);
    setSuccess(null);

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !role
    ) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // if (!passwordStrengthRegex.test(password)) {
    //   setError(
    //     "Password must be at least 8 characters long, with at least 1 uppercase letter and 1 number."
    //   );
    //   return;
    // }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    const userData = {
      firstName,
      lastName,
      username,
      email,
      password,
      phoneNumber,
      role
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("User created successfully!");
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNumber("");
        setRole("");
      } else {
        setError(data.message || "An error occurred during signup.");
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
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                name="firstName"
                onChange={handleInputChange}
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                name="lastName"
                onChange={handleInputChange}
              />
              <Input
                type="text"
                placeholder="Username"
                value={username}
                name="username"
                onChange={handleInputChange}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={handleInputChange}
              />

              <Input
                type="text"
                placeholder="Phone Number"
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
                {roles.map((role, index)=>(<option key={index} value={role.id}>{role.name}</option>))}
                </Input>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={handleInputChange}
              />
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
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
