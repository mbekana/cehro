"use client";

import { useState } from "react";
import Button from "@/app/components/UI/Button";
import Input from "@/app/components/UI/Input";
import LogoWithText from "@/app/components/UI/LogoWithText";
import { FaLock } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState<string | null>(null); 
  const router = useRouter();
  const callbackUrl =
  new URLSearchParams(window.location.search).get("callbackUrl") || "/admin";
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  // Step 1: Request password reset
  const handlePasswordResetRequest = async () => {
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/forgotpassword/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token); 
        setSuccess(true); 
        setError(null);
      } else {
        const data = await response.json();
        setError(data.message || "An error occurred.");
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
  };

  const handlePasswordResetSubmit = async () => {
    if (!password || !confirmPassword) {
      setError("Please enter both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Token is missing. Please request a password reset first.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/forgotpassword/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setSuccess(true); 
        setError(null);
        // alert("Password successfully reset.");
        router.push(callbackUrl);

      } else {
        const data = await response.json();
        setError(data.message || "An error occurred.");
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
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
            Forgot your password? No worries, let&apos;s help you reset it.
          </p>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && !password && !confirmPassword && (
          <p className="text-green-500 mb-4">
            Success! Check your email for password reset instructions.
          </p>
        )}

        <div className="flex flex-col gap-6">
          {!success && (
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
          )}

          {!success && (
            <Button
              color="primary"
              text="Reset Password"
              elevation={3}
              onClick={handlePasswordResetRequest}
              icon={<FaLock />}
              size="large"
            />
          )}

          {success && token  && (
            <>
              <p className="text-blue-500 mb-4">
                Enter your new password below to reset it.
              </p>
              <Input
                type="password"
                label="New Password"
                placeholder="Enter new password"
                value={password}
                name="password"
                onChange={handleInputChange}
                borderRadius={1}
                className="border-l-4 border-primary"
              />
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm new password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleInputChange}
                borderRadius={1}
                className="border-l-4 border-primary"
              />
              <Button
                color="primary"
                text="Submit New Password"
                elevation={3}
                onClick={handlePasswordResetSubmit}
                icon={<FaLock />}
                size="large"
              />
            </>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
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
