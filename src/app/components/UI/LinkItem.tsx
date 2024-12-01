import { usePathname } from 'next/navigation'; 
import Link from 'next/link';

interface LinkItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  trailingIcon?: React.ReactNode;
}

const LinkItem: React.FC<LinkItemProps> = ({ href, label, icon, className = '', onClick, trailingIcon }) => {
  const pathname = usePathname(); // Get the current pathname
  const isActive = pathname === href || pathname?.startsWith(`${href}/`); // Determine if the link is active

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e); 
    }
  };

  return (
    <Link href={href} passHref legacyBehavior>
      <a
        className={`flex items-center justify-between py-2 px-4 font-medium transition-colors duration-200 rounded-md ${
          isActive ? ' text-white' : 'text-gray-200 '
        } ${className}`}
        onClick={handleClick}
      >
        <div className="flex items-center">
          {icon && <span className="mr-3">{icon}</span>}
          {label}
        </div>
        {trailingIcon && <span className="ml-auto">{trailingIcon}</span>}
      </a>
    </Link>
  );
};

export default LinkItem;
