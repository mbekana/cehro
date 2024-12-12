"use client";

import { useUserContext } from "@/app/context/UserContext";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./(pages)/admin/dashboard/page";
// import LoginPage from "./(pages)/auth/login/page";
// import UserDashboard from './(pages)/user/dashboard/page';
import UserLayout from "./components/layout/UserLayout";
import UserMapFeed from "./(pages)/user/dashboard/page";

export default function Home() {
  const { login, role } = useUserContext();

  const renderLayout = () => {
    if (login && role === "admin") {
      return (
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      );
    }else{
      return (
        <UserLayout>
          <UserMapFeed />
        </UserLayout>
      );
    }

  };

  return <div>{renderLayout()}</div>;
}
