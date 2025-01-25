import UserLayout from '@/app/components/layout/UserLayout';
import React from 'react';


export default function PublicLayoutWrapper({ children }) {
  return (
    <UserLayout>
      {children}
    </UserLayout>
  );
}