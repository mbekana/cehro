"use client";

import { useState } from "react";
import Button from "@/app/components/UI/Button";
import Input from "@/app/components/UI/Input";
import LogoWithText from "@/app/components/UI/LogoWithText";
import { FaLock } from "react-icons/fa";
import Link from "next/link";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handlePasswordReset = () => {
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }

    setTimeout(() => {
      setSuccess(true);
      setError(null);
    }, 1000);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="w-full lg:w-1/2 h-full lg:h-screen bg-white p-6 rounded-sm shadow-lg flex flex-col justify-center px-6 sm:px-8 h-full md:px-12 lg:px-24 xl:px-32">
        <div className="lg:hidden mb-10">
          <LogoWithText
            logoSrc="/logo.jpg"
            altText="Company Logo"
            size="xl"
            textSize="lg"
          />
        </div>

        <div className="mb-10">
          <h2 className="text-2xl sm:text-2xl md:text-2xl font-semibold text-blue-800 mb-3 w-full sm:w-[400px]">
            Consortium of Ethiopian Human Rights Organizations
          </h2>
          <p className="text-gray-500 font-normal">
            Forgot your password? No worries, let's help you reset it.
          </p>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4">
            Success! Check your email for password reset instructions.
          </p>
        )}

        <div className="flex flex-col gap-6">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            name="email"
            onChange={handleInputChange}
            borderRadius={1}
            className="border-l-4 border-primary"
          />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          <Button
            color="primary"
            text="Reset Password"
            elevation={3}
            onClick={handlePasswordReset}
            icon={<FaLock />}
            size="large"
          />
          <Link
            href="/auth/login"
            className="text-sm text-gray-700 hover:underline mt-4 sm:mt-0 sm:ml-4 flex items-center justify-center"
          >
            Back to Login
          </Link>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 w-full items-center justify-center mt-8 lg:mt-0">
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

export default PasswordResetPage;
