'use client';

import React from 'react';

type LogoWithTextProps = {
  logoSrc: string;  
  altText: string;   
  text?: string;     
  size?: 'small' | 'medium' | 'large' | 'xl'; 
  textSize?: 'sm' | 'base' | 'lg';
};

const LogoWithText: React.FC<LogoWithTextProps> = ({
  logoSrc,
  altText,
  text,
  size = 'medium',
  textSize = 'base', 
}) => {
  const logoSizeClasses = {
    small: 'w-8 h-8', 
    medium: 'w-12 h-12',
    large: 'w-16 h-16', 
    xl: 'w-[270px] h-[270px]',
  };

  // const logoSize = {
  //   small: { width: 32, height: 32 },  
  //   medium: { width: 48, height: 48 }, 
  //   large: { width: 64, height: 64 }, 
  //   xl: { width: 270, height: 270 },   
  // };

  const textSizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className="flex items-center space-x-4 p-3 px-[80px]  rounded-md ">
      <img
        src={logoSrc}
        alt={altText}
        
        className={`${logoSizeClasses[size]} object-contain`}
      />
      {text && <p className={`${textSizeClasses[textSize]} text-gray-800 font-bold w-[230px] font-crimso`}>{text}</p>} 
    </div>
  );
};

export default LogoWithText;
