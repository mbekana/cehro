// app/admin/page.js (or index.js)
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PublicHomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/public/dashboard');
  }, [router]);

  return (<div className='h-screen flex items-center justify-center'>
    <p>Loading...</p>
  </div>); 
};

export default PublicHomePage;
