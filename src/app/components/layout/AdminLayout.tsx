'use client';

import React from 'react';
import Sidebar from './Sidebar'; 
import LogoWithText from '../UI/LogoWithText';
import Button from '@/app/components/UI/Button'; 
import { FaCalendarAlt, FaExclamationTriangle,FaFolder,FaUserTie, FaCog,FaInfoCircle, FaEdit,FaUserShield, FaGlobe, FaSignOutAlt,FaUsers,FaUsersCog, FaGraduationCap } from 'react-icons/fa';


const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sidebarLinks = [

    {
      label: "Users",
      href: "/admin/auth/signup/history",
      icon: <FaUsersCog />, 
      submenu: [
        { label: "Users", href: "/auth/signup/history", icon:<FaUsers/>},
        { label: "Add User", href: "/auth/signup/create", icon:<FaEdit/>},
      ],
    },
    {
      label: "Incidents",
      href: "/admin/incident/history",
      icon: <FaExclamationTriangle />, 
      submenu: [
        { label: "Incidents", href: "/admin/incident/history", icon:<FaCalendarAlt/>},
        { label: "Add Incident", href: "/admin/incident/create", icon:<FaEdit/>},
      ],
    },
    {
      label: "Regions",
      href: "/admin/region/history",
      icon: <FaGlobe/>,
    },
    {
      label: "Categories",
      href: "/admin/category/history",
      icon: <FaFolder/>, 
    },
    {
      label: "Educations",
      href: "/admin/education/history",
      icon: <FaGraduationCap/>, 
    },
    {
      label: "User Roles",
      href: "/admin/role/history",
      icon: <FaUserShield/>, 
    },

    {
      label: "Source",
      href: "/admin/source/history",
      icon: <FaInfoCircle/>, 
    },
    {
      label: "Occupations",
      href: "/admin/occupation/history",
      icon: <FaUserTie/>, 
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <FaCog />,
      submenu: [
        { label: "Region", href: "/admin/region/create", icon:<FaEdit/>},
        { label: "Category", href: "/admin/category/create", icon:<FaEdit/>},
        { label: "Education", href: "/admin/education/create", icon:<FaEdit/>},
        { label: "User Role", href: "/admin/role/create", icon:<FaEdit/>},
        { label: "Source", href: "/admin/source/create", icon:<FaEdit/>},
        { label: "Occupations", href: "/admin/occupation/create", icon:<FaEdit/>},
      ],
    },

  ];
  
  return (
    <div className="h-screen flex flex-col shadow-lg">
      <header className="bg-white border border-1 shadow-lg  flex justify-between items-center">
        <div className="flex items-center">
          <LogoWithText
            logoSrc="/logo.jpg"
            altText="Admin Logo"
            text="Consortium  of Ethiopian Human Right Organization"
            size="medium"
            textSize="base"
          />
        </div>

        <span className="mr-4"><Button color="danger" text="Logout" onClick={() => console.log('Logout')} icon={<FaSignOutAlt/>} size="medium"/></span>
      </header>

      <div className="flex flex-1">
        <Sidebar
          links={sidebarLinks} 
        />
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
