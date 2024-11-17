'use client';

import Button from "@/app/components/UI/Button";
import Input from "@/app/components/UI/Input";
import LogoWithText from "@/app/components/UI/LogoWithText";
import Link from "next/link";
import { useState } from "react";

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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

  const handleLogin = () => {
    if (typeof onLogin === 'function') {
      onLogin(email, password);  
    } else {
      console.error("onLogin is not a function");
    }
  };

  return (
    <div className="flex justify-between min-h-screen bg-gray-100">
      <div className="w-1/2 h-screen bg-white p-6 rounded-md shadow-lg flex flex-col justify-center px-24">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3 w-[400px]">
            Consortium of Ethiopian Human Rights Organization
          </h2>
          <p className="text-gray-500 font-normal">
            Welcome back! Please login to your account.
          </p>
        </div>
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

        <div className="flex justify-between items-center mb-4">
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
            <a
              href="/create-account"
              className="text-sm text-grey-700 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Button
            color="primary"
            text="Login"
            elevation={3}
            onClick={handleLogin}
          />
          {/* <Link href="/pages/auth/signup">
            <Button color="default" text="Sign Up" />
          </Link> */}
        </div>

        {/* <div className="mt-10 flex justify-between w-[600px]">
          <span className="text-gray-600">Or Login with</span>
          <Link href="#facebook" className="text-primary font-bold">Facebook</Link>
          <Link href="#linkedin" className="text-primary font-bold">LinkedIn</Link>
          <Link href="#google" className="text-primary font-bold">Google</Link>
        </div> */}
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

export default LoginPage;
