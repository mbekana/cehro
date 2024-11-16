import React from 'react';
import Link from 'next/link';
import Button from '../UI/Button';

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <div className="w-64 bg-accent text-white p-6">
        <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link href="/user/dashboard">
                <a className="block py-2 hover:bg-accent-light">Dashboard</a>
              </Link>
            </li>
            <li>
              <Link href="/user/profile">
                <a className="block py-2 hover:bg-accent-light">Profile</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <main className="flex-1 p-6 bg-gray-light">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">User Dashboard</h1>
          <Button color="primary" text="Logout" onClick={() => console.log('Logout')} />
        </div>

        <div>{children}</div>
      </main>
    </div>
  );
};

export default UserLayout;
