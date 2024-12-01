'use client';

import Button from "@/app/components/UI/Button";
import Input from "@/app/components/UI/Input";
import LogoWithText from "@/app/components/UI/LogoWithText";
import Link from "next/link";
import { useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaUserPlus } from "react-icons/fa";

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
    <div className="bg-gray-100">
      <BoxWrapper
        icon={<FaUserPlus />}
        title="User Signup"
        borderColor="border-primary"
        borderThickness="border-b-4"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <Input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                name="firstName"
                onChange={handleInputChange}
                // borderRadius={1}
                // className="border-l-4 border-primary"
              />
              <Input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                name="lastName"
                onChange={handleInputChange}
                // borderRadius={1}
                // className="border-l-4 border-primary"
              />
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                name="username"
                onChange={handleInputChange}
                // borderRadius={1}
                // className="border-l-4 border-primary"
              />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                name="email"
                onChange={handleInputChange}
                // borderRadius={1}
                // className="border-l-4 border-primary"
              />
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                name="password"
                onChange={handleInputChange}
                // className="border-l-4 border-primary"
                // borderRadius={1}
              />
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleInputChange}
                // className="border-l-4 border-primary"
                // borderRadius={1}
              />
              <Input
                type="text"
                placeholder="Enter your phone number"
                value={phoneNumber}
                name="phoneNumber"
                onChange={handleInputChange}
                // className="border-l-4 border-primary"
                borderRadius={1}
              />
            </div>

            <div className="mt-4 flex justify-between">
                <Button
                color="primary"
                text="Create User"
                elevation={3}
                onClick={handleSignup}
              />
            </div>
          </form>

      
        </Card>
      </BoxWrapper>

 
    </div>
  );
};

export default SignupPage;
