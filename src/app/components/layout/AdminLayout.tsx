"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'; 
import LogoWithText from '../UI/LogoWithText';
import Button from '@/app/components/UI/Button'; 
import { FaCalendarAlt, FaExclamationTriangle, FaFolder, FaUserTie, FaCog, FaInfoCircle,  FaUserShield, FaGlobe, FaSignOutAlt, FaUsers, FaUsersCog, FaGraduationCap, FaBars,  FaBalanceScale, FaHashtag, FaChartBar, FaFire } from 'react-icons/fa';
import { useUserContext } from '@/app/context/UserContext';

import { useRouter } from 'next/navigation';
import { FaFolderMinus } from 'react-icons/fa6';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const { login } = useUserContext(); 
  const router = useRouter()
  useEffect(()=>{
    if(!login){
      router.push("/")
    // }else if(isLoggingIn){
      router.push("/auth/login")

    }
  }, [])
  const sidebarLinks = [
    {
      label: "User Management",
      href: "/admin/auth/signup/history",
      icon: <FaUsersCog />, 
      submenu: [
        { label: "Users", href: "/auth/signup/history", icon: <FaUsers /> },
        // { label: "Add User", href: "/auth/signup/create", icon: <FaEdit /> },
      ],
    },
    {
      label: "Civic Space",
      href: "/admin/incident/history",
      icon: <FaExclamationTriangle />,
      submenu :[
        {
          label: "Incidents",
          href: "/admin/civic-space/incident/history",
          icon: <FaCalendarAlt />,
        },
        {
          label: "Legal Framework",
          href: "/admin/civic-space/legal-framework/history",
          icon: <FaBalanceScale />, 
        },
        {
          label: "Social Media",
          href: "/admin/civic-space/social-media/history",
          icon: <FaHashtag />, 
        },
        {
          label: "Authority Decision",
          href: "/admin/civic-space/authority-decision/history",
          icon: <FaUserShield />,
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
          label:'Thematic Category',
          href:"/admin/thematic-category/history",
          icon:<FaFolderMinus/>
        }
      ],
    },
  ];

 
  const toggleSidebar = () => setIsSidebarOpen(isSidebarOpen => !isSidebarOpen);

  return (
    
    <div className="h-screen flex flex-col shadow-lg">
       {login? (<header className="bg-white border border-1 shadow-lg flex justify-between items-center px-4 sm:px-6 md:px-8">
      <button
          className="lg:hidden text-gray-700"
          onClick={toggleSidebar}
        >
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
        <span className="mr-4 hidden md:block">
        <Button color="danger" text="Logout" onClick={() => console.log('Logout')} icon={<FaSignOutAlt />} size="medium" />
        </span>
      </header>) : null}

      <div className="flex flex-1 bg-red-200" >
        {login ? (<Sidebar links={sidebarLinks} isOpen={isSidebarOpen} onClose={toggleSidebar} />):null}
        <main className={`flex-1 bg-gray-50 ${login ? 'p-6 sm:p-4 md:p-6 lg:p-8' : ''}`}>
        {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
