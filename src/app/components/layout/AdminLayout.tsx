"use client";

import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import LogoWithText from "../UI/LogoWithText";
import Button from "@/app/components/UI/Button";
import {
  FaCalendarAlt,
  FaExclamationTriangle,
  FaFolder,
  FaUserTie,
  FaCog,
  FaInfoCircle,
  FaUserShield,
  FaGlobe,
  FaSignOutAlt,
  FaUsers,
  FaUsersCog,
  FaGraduationCap,
  FaBars,
  FaBalanceScale,
  FaHashtag,
  FaChartBar,
  FaFire,
  FaFile,
  FaNewspaper,
  FaUser,
} from "react-icons/fa";
import { FaFolderMinus } from "react-icons/fa6";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  const router = useRouter();
  useEffect(() => {
    console.log("HI: ", Cookies.get("userData"));
    // const user = Cookies.get("userData")
    //   ? JSON.parse(Cookies.get("userData")!)
    //   : null;
    const user = {
      id: "12345",
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
    };
    setUserData(user);
  }, []);

  const handleLogout = () => {
    Cookies.remove("userData");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.push("/auth/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const userAvatar = userData ? userData.firstName.charAt(0).toUpperCase() : "";

  const sidebarLinks = [
    {
      label: "User Management",
      href: "/admin/users/history",
      icon: <FaUsersCog />,
      submenu: [
        { label: "Users", href: "/admin/users/history", icon: <FaUsers /> },
      ],
    },
    {
      label: "Civic Space Management",
      href: "/admin/incident/history",
      icon: <FaExclamationTriangle />,
      submenu: [
        {
          label: "Incident Register",
          href: "/admin/civic-space/incident/history",
          icon: <FaCalendarAlt />,
        },
        {
          label: "Legal Framework Register",
          href: "/admin/civic-space/legal-framework/history",
          icon: <FaBalanceScale />,
        },
        {
          label: "Social Media Register",
          href: "/admin/civic-space/social-media/history",
          icon: <FaHashtag />,
        },
        {
          label: "Authority Decision Assesment",
          href: "/admin/civic-space/authority-decision/history",
          icon: <FaUserShield />,
        },
        {
          label: "Posts",
          href: "/admin/posts/history",
          icon: <FaNewspaper />,
        },
        {
          label: "Reports",
          href: "/coming-soon",
          icon: <FaFile />,
        },
      ],
    },

    {
      label: "Settings",
      href: "/settings",
      icon: <FaCog />,
      submenu: [
        {
          label: "Regions",
          href: "/admin/region/history",
          icon: <FaGlobe />,
        },
        {
          label: "Categories",
          href: "/admin/category/history",
          icon: <FaFolder />,
        },
        {
          label: "Educations",
          href: "/admin/education/history",
          icon: <FaGraduationCap />,
        },
        {
          label: "User Roles",
          href: "/admin/role/history",
          icon: <FaUserShield />,
        },
        {
          label: "Source",
          href: "/admin/source/history",
          icon: <FaInfoCircle />,
        },
        {
          label: "Occupations",
          href: "/admin/occupation/history",
          icon: <FaUserTie />,
        },
        {
          label: "Metrics",
          href: "/admin/metrics/history",
          icon: <FaChartBar />,
        },

        {
          label: "Impact Levels",
          href: "/admin/impact/history",
          icon: <FaFire />,
        },
        {
          label: "Thematic Category",
          href: "/admin/thematic-category/history",
          icon: <FaFolderMinus />,
        },
      ],
    },
  ];

  const toggleSidebar = () =>
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);

  return (
    <div className="h-screen flex flex-col shadow-lg">
      <header className="bg-white border border-1 shadow-lg flex justify-between items-center px-4 sm:px-6 md:px-8">
        <button className="lg:hidden text-gray-700" onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <div className="flex items-center">
          <LogoWithText
            logoSrc="/logo.jpg"
            altText="Admin Logo"
            text="Consortium of Ethiopian Human Right Organizations"
            size="medium"
            textSize="base"
          />
        </div>
        <span className="mr-4 hidden md:block relative">
          {userData ? (
            <div className="flex items-center space-x-2">
              <button
                ref={avatarRef}
                className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-semibold focus:outline-none hover:bg-primary-dark transition-colors duration-200"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                {userData.firstName.charAt(0)}{" "}
              </button>

              <span className="text-sm text-gray-700">
                {userData.firstName}
              </span>

              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-10 w-48 bg-white border rounded-md shadow-lg z-10"
                >
                  <ul className="py-1">
                    <li>
                      <button
                        onClick={() => router.push("/profile")}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        <FaUser className="inline-block mr-2" />
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        <FaSignOutAlt className="inline-block mr-2" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Button
              color="danger"
              text="Login"
              onClick={() => router.push("/auth/login")}
              icon={<FaSignOutAlt />}
              size="medium"
            />
          )}
        </span>
      </header>

      <div className="flex flex-1 bg-red-200">
        <Sidebar
          links={sidebarLinks}
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          userData={userData}
        />
        <main className={`flex-1 bg-gray-50 `}>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
