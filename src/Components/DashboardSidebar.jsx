import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  RiDashboardLine,
  RiProjectorLine,
  RiMessage2Line,
  RiSettings4Line,
  RiMenuLine,
  RiLogoutBoxRLine,
  RiCloseLine,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../Features/Tab/TokenReducer";
import { TokenValidation } from "../Helpers/TokenValidation";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  useEffect(() => {
    const isTokenValid = TokenValidation(token);
    if (!isTokenValid) {
      dispatch(removeToken());
      navigate("/admin");
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      title: "Pages",
      icon: <RiDashboardLine className="h-5 w-5" />,
      path: "/admin/dashboard/pages",
    },
    {
      title: "Projects",
      icon: <RiProjectorLine className="h-5 w-5" />,
      path: "/admin/dashboard/projects",
    },
    {
      title: "Messages",
      icon: <RiMessage2Line className="h-5 w-5" />,
      path: "/admin/dashboard/messages",
    },
    // {
    //   title: "Settings",
    //   icon: <RiSettings4Line className="h-5 w-5" />,
    //   path: "/admin/settings",
    // },
  ];

  const handleLogout = () => {
    dispatch(removeToken());
    navigate("/admin");
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md hover:bg-gray-100"
      >
        {isOpen ? (
          <RiCloseLine className="h-6 w-6 text-gray-500" />
        ) : (
          <RiMenuLine className="h-6 w-6 text-gray-500" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-50 transition-all duration-300 ${
          isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="text-xl font-light text-gray-800">Admin</span>
        </div>

        {/* Menu Items */}
        <div className="py-4 flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-colors duration-200 ${
                location.pathname === item.path
                  ? "bg-gray-50 text-indigo-600 border-r-2 border-indigo-600"
                  : ""
              }`}
            >
              <div className="flex items-center">
                {item.icon}
                <span className="ml-3 font-light">{item.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex absolute bottom-5 p-5 group left-0 hover:bg-red-300 transition-all duration-300 items-center justify-start mt-auto"
        >
          <RiLogoutBoxRLine className="h-5 w-5 group-hover:text-red-500 transition-all duration-300" />
          <span className="ml-3 font-light group-hover:text-red-500 transition-all duration-300">
            Logout
          </span>
        </button>
      </div>
    </>
  );
};

export default DashboardSidebar;
