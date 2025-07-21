import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  RiDashboardLine,
  RiProjectorLine,
  RiMessage2Line,
  RiSettings4Line,
  RiMenuLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      icon: <RiDashboardLine className="h-5 w-5" />,
      path: "/admin/dashboard",
    },
    {
      title: "Projects",
      icon: <RiProjectorLine className="h-5 w-5" />,
      path: "/admin/projects",
    },
    {
      title: "Messages",
      icon: <RiMessage2Line className="h-5 w-5" />,
      path: "/admin/messages",
    },
    {
      title: "Settings",
      icon: <RiSettings4Line className="h-5 w-5" />,
      path: "/admin/settings",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div
      className={`h-screen bg-white border-r relative border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo ve Toggle Butonu */}
      <div className="flex  items-center justify-between p-4 border-b border-gray-200">
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center w-full" : ""
          }`}
        >
          {!isCollapsed && (
            <span className="text-xl font-light text-gray-800">Admin</span>
          )}
          {isCollapsed && <span className="text-xl font-light">A</span>}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1 rounded-lg hover:bg-gray-100 ${
            isCollapsed ? "mx-auto" : ""
          }`}
        >
          <RiMenuLine className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      {/* Menu Items */}
      <div className="py-4 flex flex-col gap-2 items-start h-full justify-start">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center ${
              isCollapsed ? "justify-center" : ""
            } px-4 py-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-colors duration-200 ${
              location.pathname === item.path
                ? "bg-gray-50 text-indigo-600 border-r-2 border-indigo-600"
                : ""
            }`}
          >
            <div className="flex items-center">
              {item.icon}
              {!isCollapsed && (
                <span className="ml-3 font-light">{item.title}</span>
              )}
            </div>
          </button>
        ))}
      </div>
      <button
        onClick={handleLogout}
        className="w-full flex absolute bottom-5 p-5 group left-0 hover:bg-red-300 transition-all duration-300 items-center justify-start mt-auto"
      >
        <RiLogoutBoxRLine className="h-5 w-5 group-hover:text-red-500 transition-all duration-300" />
        {!isCollapsed && <span className="ml-3 font-light group-hover:text-red-500 transition-all duration-300">Logout</span>}
      </button>
    </div>
  );
};

export default DashboardSidebar;
