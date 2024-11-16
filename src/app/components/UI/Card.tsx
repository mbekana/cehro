import React from 'react';

type CardProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  borderColor?: string;
  bgColor?:string;
  borderThickness?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  borderColor = 'border-gray-300',
  bgColor,
  borderThickness = 'border-2',
  actions,
  children,
}) => {
  return (
    <div className={`flex flex-col  p-4 bg-${bgColor} rounded-lg ${borderColor} ${borderThickness}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="text-2xl">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      </div>

        {description &&       <p className="text-gray-600 text-sm mb-4" >{description}</p>
      }
      <div className="flex-1 mb-4">
        {children}
      </div>

      {actions && <div className="mt-auto">{actions}</div>}
    </div>
  );
};

export default Card;
