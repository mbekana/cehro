'use client';

import { useState } from 'react';

import AdminLayout from './components/layout/AdminLayout';
import LoginPage from './(pages)/auth/login/page';


export default function Home() {

  const [login, setLogin] = useState(false); 
  const [role, setRole] = useState<'admin' | 'user' | null>(null); 

  const handleLogin = (email: string, password: string) => {
    if (email === 'admin@admin.com' && password === 'password') {
      setLogin(true);
      setRole('admin');
    } else if (email === 'user@user.com' && password === 'password') {
      setLogin(true);
      setRole('user');
    } else {
      setLogin(false);
      setRole(null);
      alert('Invalid credentials');
    }
  };

  const renderLayout = () => {
    if (login && role === 'admin') {
      return <AdminLayout><h1>Welcome Admin</h1></AdminLayout>;
    }

    return <LoginPage   onLogin={handleLogin} />;
  };

  return (
    <div>
      {renderLayout()}
    </div>
  );
}
