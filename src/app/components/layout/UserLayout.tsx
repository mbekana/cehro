"use client";

import React, { useEffect, useState } from "react";
import LogoWithText from "../UI/LogoWithText";
import Button from "@/app/components/UI/Button";
import {  FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import Link from "next/link";

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    setLoggedIn(false);
  }, []);
  // const navbarLinks = [
  //   {
  //     label: "Incident Map",
  //     href: "/user/dashboard",
  //     icon: <FaUsersCog />,
  //   },
  // ];

  return (
    <div className="h-auto flex flex-col shadow-sm bg-white">
      <header className="bg-white  shadow-sm flex justify-between items-center px-4 sm:px-6 md:px-8">
        <div className="flex items-center">
          <LogoWithText
            logoSrc="/logo.jpg"
            altText="Admin Logo"
            text="Consortium of Ethiopian Human Right Organization"
            size="medium"
            textSize="base"
          />
        </div>
        {loggedIn ? (
          <span className="mr-4 hidden md:block">
            <Button
              color="text"
              text="Logout"
              onClick={() => console.log("Logout")}
              icon={<FaSignOutAlt />}
              size="medium"
            />
          </span>
        ) : (
          <span className="mr-4 hidden md:block">
            <Link href="/auth/login">
              <Button
                color="text"
                text="Login"
                onClick={() => console.log("Logout")}
                icon={<FaSignInAlt />}
                size="medium"
                className="text-indi"
              />
            </Link>
          </span>
        )}
      </header>

      <div className="flex-1 p-6">
        <div className="space-y-4">
           <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
