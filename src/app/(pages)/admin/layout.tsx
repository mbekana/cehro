import AdminLayout from '@/app/components/layout/AdminLayout';
import React from 'react';


export default function AdminLayoutWrapper({ children }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}