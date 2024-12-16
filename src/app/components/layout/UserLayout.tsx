"use client";

import React, { useEffect, useState } from "react";
import LogoWithText from "../UI/LogoWithText";
import Button from "@/app/components/UI/Button";
import { FaSignOutAlt, FaSignInAlt, FaChevronDown, FaChevronUp } from "react-icons/fa"; // Add FaChevronUp for the open state
import Link from "next/link";
import { FaSubscript } from "react-icons/fa6";

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    setLoggedIn(false);
  }, []);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navbarLinks = [
    { label: "About", href: "/coming-soon" },
    {
      label: "Data",
     href: "/coming-soon",
      hasDropdown: true,
      icon: <FaChevronDown />, // Default icon
      openIcon: <FaChevronUp />, // Icon for open state
      dropdownLinks: [
        { label: "Data Link 1", href: "/coming-soon" },
        { label: "Data Link 2", href: "/coming-soon" },
      ],
    },
    {
      label: "Analysis",
      href: "/user/settings",
      hasDropdown: true,
      icon: <FaChevronDown />,
      openIcon: <FaChevronUp />,
      dropdownLinks: [
        { label: "Analysis Link 1", href: "/coming-soon" },
        { label: "Analysis Link 2", href: "/coming-soon" },
      ],
    },
    {
      label: "Region, Actor and Conflict Profiles",
      href: "/user/help",
      hasDropdown: true,
      icon: <FaChevronDown />,
      openIcon: <FaChevronUp />,
      dropdownLinks: [
        { label: "Profile Link 1", href: "/coming-soon" },
        { label: "Profile Link 2", href: "/coming-soon"},
      ],
    },
    { label: "Subscribe", href: "/coming-soon", icon: <FaSubscript /> },
  ];

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className="h-auto flex flex-col shadow-sm bg-white">
      <header className="bg-white shadow-sm flex justify-between items-center px-4 sm:px-6 md:px-8">
        <div className="flex items-center">
          <Link href="/">
            <LogoWithText
              logoSrc="/logo.jpg"
              altText="Admin Logo"
              text="Consortium of Ethiopian Human Right Organizations"
              size="medium"
              textSize="base"
            />
          </Link>
        </div>

        <nav className="flex-grow flex justify-center items-center space-x-8">
          <ul className="flex items-center space-x-8">
            {navbarLinks.map((link) => (
              <li key={link.href} className="relative flex items-center">
                <Link
                  href={link.href}
                  className="text-md font-normal text-teal-500 hover:text-teal-500 cursor-pointer flex items-center"
                  onClick={
                    link.hasDropdown
                      ? (e) => {
                          e.preventDefault();
                          toggleDropdown(link.label);
                        }
                      : undefined
                  }
                >
                  {link.label} 
                  {link.hasDropdown && (
                    <span className="ml-1">
                      {openDropdown === link.label ? link.openIcon : link.icon}
                    </span>
                  )}
                </Link>

                {link.hasDropdown && openDropdown === link.label && (
                  <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md space-y-2 p-4 w-40">
                    {link.dropdownLinks?.map((dropdownLink) => (
                      <li key={dropdownLink.href}>
                        <Link
                          href={dropdownLink.href}
                          className="text-gray-700 hover:text-teal-500"
                        >
                          {dropdownLink.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

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
                onClick={() => console.log("Login")}
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
