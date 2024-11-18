'use client';

import { useUserContext } from '@/app/context/UserContext';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './(pages)/admin/dashboard';
import LoginPage from './(pages)/auth/login/page';

export default function Home() {
  const { login, role } = useUserContext();  // Access context values

  const renderLayout = () => {
    if (login && role === 'admin') {
      return <AdminLayout><AdminDashboard /></AdminLayout>;
    } else if (login && role === 'user') {
      return <div>User Dashboard or other component</div>; // Handle user layout here
    }

    return <LoginPage />;
  };

  return (
    <div>
      {renderLayout()}
    </div>
  );
}