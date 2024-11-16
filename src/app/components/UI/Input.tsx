import React from 'react';

type InputProps = {
  type: 'text' |'textarea' | 'email' | 'number' | 'password' | 'file' | 'date' | 'select';   
  label?: string;
  placeholder?: string;  
  value: string | string[]; 
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => void;
  disabled?: boolean;
  className?: string;
  name: string;
  icon?: React.ReactNode;
  borderRadius?: number;
  children?: React.ReactNode; 
};

const Input: React.FC<InputProps> = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  className = "",
  name,
  icon,
  borderRadius = 2,  
  children
}) => {
 
  const borderRadiusClass =
    borderRadius === 1 ? "rounded-sm" :
    borderRadius === 2 ? "rounded-md" :
    borderRadius === 3 ? "rounded-lg" :
    borderRadius === 4 ? "rounded-xl" : "rounded-full";  

  return (
    <div className="flex flex-col space-y-2">
      {label && <label className="text-sm font-medium text-text-primary">{label}</label>}
      <div className="relative flex items-center w-full">
        {icon && (
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            {icon}
          </span>
        )}

        {type === 'select' ? (
          <select
            name={name}
            value={value as string}  
            onChange={onChange}
            disabled={disabled}
            className={`py-2 px-4 pl-10 pr-4 border border-gray-300 ${borderRadiusClass} focus:ring-2 focus:ring-primary focus:outline-none disabled:bg-gray-200 w-full ${className}`}
          >
            {children}
          </select>
        ) : type === 'file' ? (
          <input
            type="file"
            name={name}
            onChange={onChange}
            disabled={disabled}
            className={`py-2 px-4 pl-10 pr-4 border border-gray-300 ${borderRadiusClass} focus:ring-2 focus:ring-primary focus:outline-none disabled:bg-gray-200 w-full ${className}`}
          />
        ) : type === 'date' ? (
          <input
            type="date"
            name={name}
            value={value as string}  
            onChange={onChange}
            disabled={disabled}
            className={`py-2 px-4 pl-10 pr-4 border border-gray-300 ${borderRadiusClass} focus:ring-2 focus:ring-primary focus:outline-none disabled:bg-gray-200 w-full ${className}`}
          />
        ) 
        :type === "textarea" ? (
          <textarea
          name={name}
          value={value as string}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`py-2 px-4 pl-10 pr-4 border border-gray-300 ${borderRadiusClass} focus:ring-2 focus:ring-primary focus:outline-none disabled:bg-gray-200 w-full ${className}`}
        />     ):
        (
          <input
            type={type}
            placeholder={placeholder}
            value={value as string}  
            name={name}
            onChange={onChange}
            disabled={disabled}
            className={`py-2 px-4 pl-10 pr-4 border border-gray-300 ${borderRadiusClass} focus:ring-2 focus:ring-primary focus:outline-none disabled:bg-gray-200 w-full ${className}`}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
