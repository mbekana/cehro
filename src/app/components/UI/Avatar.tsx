import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  text?: string;  
  icon?: React.ReactNode;  
  size?: 'small' | 'medium' | 'large';  
  border?: boolean;  
  className?: string;  
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  text,
  icon,
  size = 'medium',
  border = false,
  className = '',
}) => {
  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-12 h-12 text-base',
    large: 'w-16 h-16 text-lg',
  };

  const borderClasses = border ? 'border-2 border-gray-300' : '';

  return (
    <div
      className={`flex items-center justify-center rounded-full ${sizeClasses[size]} ${borderClasses} bg-gray-200 ${className}`}
    >
      {src ? (
        <img src={src} alt={alt || 'avatar'} className="w-full h-full rounded-full object-cover" />
      ) : icon ? (
        <span className="text-white">{icon}</span> 
      ) : text ? (
        <span className="text-white font-semibold">{text}</span> 
      ) : (
        <span className="text-white">?</span> 
      )}
    </div>
  );
};

export default Avatar;
