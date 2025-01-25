"use client";

import { useState } from "react";
// import { useUserContext } from "@/app/context/UserContext"; // Import the context hook
import Button from "@/app/components/UI/Button";
import Input from "@/app/components/UI/Input";
import LogoWithText from "@/app/components/UI/LogoWithText";
import { FaSignInAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { apiRequest } from "@/app/services/apiService";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null); // For handling errors
  const callbackUrl =
    new URLSearchParams(window.location.search).get("callbackUrl") || "/admin";
  const router = useRouter();
  const baseUrl = "http://localhost:5000";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe((prev) => !prev);
  };

  const handleLogin = async () => {
    const credentials = { email, password };
    const options = {
      method: "POST",
      body: { ...credentials },
      headers: {},
    };
    try {
      const data = await apiRequest("/api/auth/login", options);
      if (data.token) {
        Cookies.set("accessToken", data.token, { expires: 1 }); 
        if (data.refreshToken) {
          Cookies.set("refreshToken", data.refreshToken, { expires: 7 }); 
        }
        if(data.userData){
          Cookies.set("userData", JSON.stringify(data.userData))
        }
        router.push(callbackUrl);
      } else {
        setError("Invalid credentials or something went wrong.");
      }
    } catch (error) {
      setError("Invalid credentials or something went wrong.");
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
            Welcome back! Please login to your account.
          </p>
        </div>
        {error && <p className="text-red-500">{error}</p>}
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
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            name="password"
            onChange={handleInputChange}
            className="border-l-4 border-primary"
            borderRadius={1}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              id="remember-me"
              className="form-checkbox h-4 w-4 text-primary"
            />
            <label htmlFor="remember-me" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <div>
            <Link
              href="/auth/password-reset"
              className="text-sm text-gray-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            color="primary"
            text="Login"
            elevation={3}
            onClick={handleLogin}
            icon={<FaSignInAlt />}
            size="large"
          />
          {/* <Link href="/pages/auth/signup">
            <Button color="default" text="Sign Up" />
          </Link> */}
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

export default LoginPage;
