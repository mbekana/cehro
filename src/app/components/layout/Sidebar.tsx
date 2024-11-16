"use-client";
import Avatar from "../UI/Avatar";
import {
  FaSearch,
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import Input from "../UI/Input";
import { useState } from "react";
import LinkItem from "../UI/LinkItem";
import Button from "../UI/Button";

interface SidebarProps {
  links: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    size?: number;
    submenu?: { label: string; href: string; icon: React.ReactNode }[];
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  const [openSubmenu, setOpenSubmenu] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSubmenu = (index: string) => {
    setOpenSubmenu((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="w-64 bg-primary shadow-lg p-6 h-full flex flex-col">
      <div className="py-2 px-4">
        <div className="flex items-center justify-left space-x-3">
          <Avatar src="./logo.jpg" size="small" border={false} />
          <p className="text-white">John Doe</p>
        </div>
      </div>
      <div className="my-1 border-t border-gray-300" />
      <div>
        <Input
          type="text"
          placeholder="Search..."
          value="search"
          name="search"
          onChange={() => {}}
          className="border-l-4 border-primary"
          icon={<FaSearch />}
        />
      </div>
      <nav className="mt-6 flex-1">
        <ul>
          {links.map((link, index) => (
            <div key={index}>
              {/* Main Link Item */}
              <li>
                <LinkItem
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  className="flex items-center py-2 px-4 font-medium text-gray-200  rounded-md transition-colors duration-200"
                  onClick={(e) => {
                    if (link.submenu) {
                      e.preventDefault();
                      toggleSubmenu(index.toString());
                    }
                  }}
                  trailingIcon={
                    link.submenu ? (
                      openSubmenu[index] ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )
                    ) : null
                  }
                />
              </li>

              {link.submenu && openSubmenu[index] && (
                <ul className="pl-6 mt-2">
                  {link.submenu.map((submenuItem, subIndex) => (
                    <li key={subIndex}>
                      <LinkItem
                        href={submenuItem.href}
                        label={submenuItem.label}
                        icon={submenuItem.icon}
                        className="flex items-center py-2 px-4 text-white  rounded-md transition-colors duration-200"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <ul>
          <li>
            <LinkItem
              href="/help"
              label="Help"
              icon={<FaQuestionCircle className="mr-3" />}
              className="text-white hover:bg-gray-200"
            />
          </li>
          <li>
            <span>
              <Button
                color="danger"
                text="Logout"
                onClick={() => console.log("Logout")}
                icon={<FaSignOutAlt />}
                size="medium"
              />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
