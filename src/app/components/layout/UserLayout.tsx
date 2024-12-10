"use client";

import React from 'react';
import LogoWithText from '../UI/LogoWithText';
import Button from '@/app/components/UI/Button'; 
import { FaUsersCog,  FaSignOutAlt } from 'react-icons/fa'; 

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const navbarLinks = [
    {
      label: "Incident Map",
      href: "/user/dashboard",
      icon: <FaUsersCog />, 
    },
  ];

  return (
    <div className="h-screen flex flex-col shadow-lg bg-gray-200">
      <header className="bg-white border border-1 shadow-lg flex justify-between items-center px-4 sm:px-6 md:px-8">
        <div className="flex items-center">
          <LogoWithText
            logoSrc="/logo.jpg"
            altText="Admin Logo"
            text="Consortium of Ethiopian Human Right Organization"
            size="medium"
            textSize="base"
          />
        </div>
        <span className="mr-4 hidden md:block">
          <Button color="default" text="Logout" onClick={() => console.log('Logout')} icon={<FaSignOutAlt />} size="medium" />
        </span>
      </header>

      <div className="flex-1 p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            {navbarLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                className="text-black flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <div className="mt-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
