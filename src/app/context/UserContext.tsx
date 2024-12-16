'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
interface UserContextType {
  login: boolean;
  role: 'admin' | 'user' | null;
  setLogin: (loginStatus: boolean) => void;
  setRole: (role: 'admin' | 'user' | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [role, setRole] = useState<'admin' | 'user' | null>(null);

  const router = useRouter(); 

  useEffect(() => {
    if (login && role === 'admin') {
      router.replace('/');
    }
  }, [login, role, router]); 


  return (
    <UserContext.Provider value={{ login, role, setLogin, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
