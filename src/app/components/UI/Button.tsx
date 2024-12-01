"use-client"

type ButtonProps = {
  color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'default' | 'danger';
  text: string;
  onClick?: (e?: React.FormEvent) => void;
  disabled?: boolean;
  elevation?: number;
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large' ; 
  className?:string;
  borderRadius?:number
};

const Button: React.FC<ButtonProps> = ({ color, text, onClick, disabled = false, elevation = 0, icon, size = 'medium', className, borderRadius}) => {
  const baseClasses = "py-2 px-4 rounded-sm focus:outline-none focus:ring transition flex items-center justify-center";

  const colorClasses = {
    primary: "bg-primary border border-[#1110EE] text-white",
    secondary: "bg-secondary text-white",
    success: "bg-success text-white hover:bg-green-700",
    error: "bg-error text-white hover:bg-red-700",
    warning: "bg-warning text-white hover:bg-yellow-700",
    default: "bg-white text-[#1110EE] border border-[#1110EE] hover:bg-[#1110EE] hover:text-[#FFFFFF]",
    danger: "bg-white text-red-700 border border-red-700"
  };

  // Elevation classes based on the elevation prop
  const elevationClasses =
    elevation === 0
      ? ""
      : elevation === 1
      ? "shadow-sm"
      : elevation === 2
      ? "shadow-md"
      : elevation === 3
      ? "shadow-lg"
      : elevation === 4
      ? "shadow-xl"
      : elevation === 5
      ? "shadow-2xl"
      : "";

  const sizeClasses = {
    small: "w-24",  
    medium: "w-32", 
    large: "w-[300px]"   
  };

  return (
    <button
      className={`${baseClasses} ${colorClasses[color]} ${elevationClasses} ${sizeClasses[size]} ${className} rounded-[${borderRadius}] ${disabled ? "bg-disabled cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2 flex items-center justify-center">{icon}</span>} 
      {text}
    </button>
  );
};

export default Button;
