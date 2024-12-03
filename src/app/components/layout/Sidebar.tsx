import { useState } from "react";
import LinkItem from "../UI/LinkItem";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface SidebarProps {
  links: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    size?: number;
    submenu?: { label: string; href: string; icon: React.ReactNode; submenu?: any[] }[];
  }[];
  isOpen: boolean; 
  onClose: () => void; 
}

const Sidebar: React.FC<SidebarProps> = ({ links, onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState<{ [key: string]: boolean }>({});

  const toggleSubmenu = (submenuKey: string) => {
    setOpenSubmenu((prevState) => ({
      ...prevState,
      [submenuKey]: !prevState[submenuKey],
    }));
  };

  const renderSubmenu = (submenu: any[], parentLabel: string) => {
    return submenu.map((submenuItem, subIndex) => {
      const submenuKey = `${parentLabel}-${submenuItem.label}`;

      return (
        <div key={subIndex}>
          <LinkItem
            href={submenuItem.href}
            label={submenuItem.label}
            icon={submenuItem.icon}
            className="flex items-center py-2 px-4 text-white rounded-md transition-colors duration-200"
          />

          {submenuItem.submenu && openSubmenu[submenuKey] && (
            <div className="pl-6 mt-2">{renderSubmenu(submenuItem.submenu, submenuKey)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className={`fixed inset-0 lg:relative bg-primary shadow-lg p-6 h-full flex flex-col transition-transform duration-300 ease-in-out transform`}
      style={{ width: 'fit-content' }} 
    >

     {/* <div  className={`fixed inset-0 lg:relative lg:w-64 bg-primary shadow-lg p-6 h-full flex flex-col transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}> */}

      <div className="absolute top-4 right-4 lg:hidden">
        <button onClick={onClose} className="text-white">
          <FaChevronDown size={24} />
        </button>
      </div>

      <div className="py-2 px-4">
        <div className="flex items-center justify-left space-x-3">
          <p className="text-white">John Doe</p>
        </div>
      </div>
      <div className="my-1 border-t border-gray-300" />

      <nav className="mt-6 flex-1">
        <ul>
          {links.map((link, index) => (
            <div key={index}>
              <li>
                <LinkItem
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  className="flex items-center py-2 px-4 font-medium text-gray-200 rounded-md transition-colors duration-200"
                  onClick={(e) => {
                    if (link.submenu) {
                      e.preventDefault(); 
                      toggleSubmenu(link.label); 
                    }
                  }}
                  trailingIcon={
                    link.submenu ? (
                      openSubmenu[link.label] ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )
                    ) : null
                  }
                />
              </li>

              {link.submenu && openSubmenu[link.label] && (
                <div className="pl-6 mt-2">{renderSubmenu(link.submenu, link.label)}</div>
              )}
            </div>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
