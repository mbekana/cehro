'use client';

import Button from "@/app/components/UI/Button";
import Input from "@/app/components/UI/Input";
import LogoWithText from "@/app/components/UI/LogoWithText";
import Link from "next/link";
import { useState } from "react";

const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
      default:
        break;
    }
  };

  const handleSignup = () => {
    if (password === confirmPassword) {
      console.log({ firstName, lastName, username, email, password, phoneNumber });
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="flex justify-between min-h-screen bg-gray-100">
      <div className="w-1/2 h-screen bg-white p-6 rounded-md shadow-lg flex flex-col justify-center px-24">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3 w-[400px]">
            Consortium of Ethiopian Human Right Organization
          </h2>
          <p className="text-gray-500 font-normal">
            Welcome! Please create your account.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <Input
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            name="firstName"
            onChange={handleInputChange}
            borderRadius={1}
            className="border-l-4 border-primary"
          />
          <Input
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            name="lastName"
            onChange={handleInputChange}
            borderRadius={1}
            className="border-l-4 border-primary"
          />
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            name="username"
            onChange={handleInputChange}
            borderRadius={1}
            className="border-l-4 border-primary"
          />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            name="email"
            onChange={handleInputChange}
            borderRadius={1}
            className="border-l-4 border-primary"
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            name="password"
            onChange={handleInputChange}
            className="border-l-4 border-primary"
            borderRadius={1}
          />
          <Input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleInputChange}
            className="border-l-4 border-primary"
            borderRadius={1}
          />
          <Input
            type="text"
            placeholder="Enter your phone number"
            value={phoneNumber}
            name="phoneNumber"
            onChange={handleInputChange}
            className="border-l-4 border-primary"
            borderRadius={1}
          />
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/pages/auth/login">
            <Button
              color="default"
              text="Login"
              elevation={3}
            />
          </Link>
          <Button
            color="primary"
            text="Sign Up"
            elevation={3}
            onClick={handleSignup}
          />
        </div>

        <div className="mt-10 flex justify-between w-[600px]">
          <span className="text-gray-600">Or Sign up with</span>
          <Link href="#facebook" className="text-primary font-bold">Facebook</Link>
          <Link href="#Linkedin" className="text-primary font-bold">Linkedin</Link>
          <Link href="#Google" className="text-primary font-bold">Google</Link>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <LogoWithText
          logoSrc="/logo.jpg"
          altText="Company Logo"
          size="xl"
          textSize="lg"
        />
      </div>
    </div>
  );
};

export default SignupPage;
