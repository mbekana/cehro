"use client";

import React, { useEffect, useState } from "react";
import LogoWithText from "../UI/LogoWithText";
import Button from "@/app/components/UI/Button";
import {
  FaSignOutAlt,
  FaSignInAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Link from "next/link";
import { FaSubscript } from "react-icons/fa6";

const UserLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    setLoggedIn(false);
  }, []);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // For top-level dropdowns
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null); // For second-level dropdowns
  const [openSubSubDropdown, setOpenSubSubDropdown] = useState<string | null>(
    null
  ); // For third-level dropdowns

  const navbarLinks = [
    { label: "About", href: "/coming-soon" },
    {
      label: "Data",
      href: "/user/data",
      hasDropdown: true,
      icon: <FaChevronDown />,
      openIcon: <FaChevronUp />,
      dropdownLinks: [
        { label: "Data", href: "/user/data" },
        {
          label: "Forecasts with summary",
          href: "/coming-soon",
          hasDropdown: true,
          icon: <FaChevronDown />,
          openIcon: <FaChevronUp />,
          dropdownLinks: [
            {
              label: "Graphs",
              href: "/coming-soon/graphs",
              hasSubDropdown: true,
              icon: <FaChevronDown />,
              openIcon: <FaChevronUp />,
              subDropdownLinks: [
                { label: "Graph 1", href: "/coming-soon/graphs/1" },
                { label: "Graph 2", href: "/coming-soon/graphs/2" },
              ],
            },
            {
              label: "Align matrix with timeframe",
              href: "/coming-soon/matrix-description",
            },
          ],
        },
        { label: "Fetched Advocacy Components", href: "/coming-soon" },
        { label: "Methodology", href: "/coming-soon" },
      ],
    },
    {
      label: "Analysis",
      href: "/user/settings",
      hasDropdown: true,
      icon: <FaChevronDown />,
      openIcon: <FaChevronUp />,
      dropdownLinks: [
        { label: "Weekly Report", href: "/coming-soon" },
        { label: "Monthly Report", href: "/coming-soon" },
        {
          label: "Report filtered by Matrix",
          href: "/coming-soon/matrix-report",
        },
      ],
    },
    {
      label: "Civic Space data explorer",
      href: "/coming-soon",
      hasDropdown: true,
      icon: <FaChevronDown />,
      openIcon: <FaChevronUp />,
      dropdownLinks: [
        {
          label: "Region View",
          href: "/coming-soon/region-view",
          hasDropdown: true,
          icon: <FaChevronDown />,
          openIcon: <FaChevronUp />,
          dropdownLinks: [
            { label: "Matrix", href: "/coming-soon/region-view/matrix" },
            { label: "Timeframe", href: "/coming-soon/region-view/timeframe" },
          ],
        },
      ],
    },
    { label: "Subscribe", href: "/coming-soon", icon: <FaSubscript /> },
  ];

  const toggleDropdown = (label: string) =>
    setOpenDropdown(openDropdown === label ? null : label);
  const toggleSubDropdown = (label: string) =>
    setOpenSubDropdown(openSubDropdown === label ? null : label);
  const toggleSubSubDropdown = (label: string) =>
    setOpenSubSubDropdown(openSubSubDropdown === label ? null : label);

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
                  className="text-md font-normal text-teal-500 hover:text-teal-500 cursor-pointer flex items-center w-full"
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

                {/* First-Level Dropdown */}
                {link.hasDropdown && openDropdown === link.label && (
                  <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md space-y-2 p-4 min-w-max z-10">
                    {link.dropdownLinks?.map((dropdownLink) => (
                      <li key={dropdownLink.href} className="relative">
                        <Link
                          href={dropdownLink.href}
                          className="text-gray-700 hover:text-teal-500 w-full inline-flex items-center"
                          onClick={
                            dropdownLink.hasDropdown
                              ? (e) => {
                                  e.preventDefault();
                                  toggleSubDropdown(dropdownLink.label);
                                }
                              : undefined
                          }
                        >
                          {dropdownLink.label}
                          {dropdownLink.hasDropdown && (
                            <span className="ml-1">
                              {openSubDropdown === dropdownLink.label
                                ? dropdownLink.openIcon
                                : dropdownLink.icon}
                            </span>
                          )}
                        </Link>
                        {dropdownLink.hasDropdown &&
                          openSubDropdown === dropdownLink.label && (
                            <ul className="absolute left-full top-0 ml-4 mt-0 bg-white shadow-lg rounded-md space-y-2 p-4 min-w-max z-20">
                              {dropdownLink.dropdownLinks?.map(
                                (subDropdownLink) => (
                                  <li
                                    key={subDropdownLink.href}
                                    className="relative"
                                  >
                                    <Link
                                      href={subDropdownLink.href}
                                      className="text-gray-600 hover:text-teal-500 w-full inline-flex items-center "
                                      onClick={
                                        subDropdownLink.hasSubDropdown
                                          ? (e) => {
                                              e.preventDefault();
                                              toggleSubSubDropdown(
                                                subDropdownLink.label
                                              );
                                            }
                                          : undefined
                                      }
                                    >
                                      {subDropdownLink.label}
                                      {subDropdownLink.hasSubDropdown && (
                                        <span className="ml-1">
                                          {openSubSubDropdown ===
                                          subDropdownLink.label
                                            ? subDropdownLink.openIcon
                                            : subDropdownLink.icon}
                                        </span>
                                      )}
                                    </Link>

                                    {/* Third-Level Dropdown */}
                                    {subDropdownLink.hasSubDropdown &&
                                      openSubSubDropdown ===
                                        subDropdownLink.label && (
                                        <ul className="absolute left-full top-0 mt-0 ml-4 bg-white shadow-lg rounded-md space-y-2 p-4 min-w-max z-30">
                                          {subDropdownLink.subDropdownLinks?.map(
                                            (subSubDropdownLink) => (
                                              <li key={subSubDropdownLink.href}>
                                                <Link
                                                  href={subSubDropdownLink.href}
                                                  className="text-gray-600 hover:text-teal-500 w-full"
                                                >
                                                  {subSubDropdownLink.label}
                                                </Link>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      )}
                                  </li>
                                )
                              )}
                            </ul>
                          )}
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
