"use-client"

import React from 'react';

interface BoxWrapperProps {
  icon: React.ReactNode;       
  title: string;               
  borderColor?: string;      
  borderThickness?: string;  
  children: React.ReactNode;    
  shouldGoBack?:boolean;      
}

const BoxWrapper: React.FC<BoxWrapperProps> = ({
  icon,
  title,
  borderColor = 'border-gray-300',  
  borderThickness = 'border-b-2',   
  children,
  shouldGoBack,                      
}) => {
  const handleAction = () => {
    if (!shouldGoBack) {
      return;
    } else {
      window.history.back(); 
    }
  };

  return (
    <div className="bg-white border border-1 mx-24 mt-12">
      <header className={`flex items-center ${borderThickness} ${borderColor} p-4`}>
        <div 
          className="mr-4 cursor-pointer" 
          onClick={handleAction}           
        >
          {icon} 
        </div>
        <h2 className="text-md font-semibold text-gray-800 uppercase">{title}</h2>
      </header>

      <main className="m-auto p-10 rounded-lg my-5">
        {children} 
      </main>
    </div>
  );
};

export default BoxWrapper;
