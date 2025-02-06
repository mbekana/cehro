// app/admin/page.js (or index.js)
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdminHomePage = () => {
  
  const router = useRouter();
  useEffect(()=>{
    console.log(localStorage.getItem('refreshToken'))
  },[])
  useEffect(() => {
    router.push('/admin/dashboard');
  }, [router]);

  return null; 
};

export default AdminHomePage;
