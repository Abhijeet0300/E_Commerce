import React, { useState, useRef, useEffect } from "react";
import { Constants } from "../../../utils/Constants";
import { useNavigate } from "react-router-dom";
import NavButton from "../../../components/common/NavButton";

const SellerNavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [activeItem, setActiveItem] = useState("Dashboard");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Add your logout logic here (e.g., clear tokens)
    console.log("Logging out...");
    navigate("/login");
  };

  //SideBar items
  const sidebarItems = [
    { label: "Dashboard", icon: "📊" },
    { label: "Total Bikes", icon: "🏍️" },
    { label: "Total Orders", icon: "🛒" },
    { label: "Total Revenue", icon: "💰" },
    { label: "Pending Orders", icon: "⏳" },
    { label: "Add Bike", icon: "🏍️" },
  ];

  const handleItemClick = (label: string) => {
    setActiveItem(label); // Set the new active color
    setIsSidebarOpen(false); // Optional: Close sidebar after selection
    // navigate("/dashboard"); // You can add navigation here later
  };

  return (
    <>
      <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-100">
        {/* Navigation */}
        <NavButton
          onNavButtonClick={() => {
            setIsSidebarOpen(true);
          }}
        />
        {/* Title */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="font-iceland text-4xl font-bold text-gray-800 tracking-wide">
            {Constants.APP_NAME}
          </h1>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">
          {/* Person Icon & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full transition-colors focus:outline-none ${
                isMenuOpen
                  ? "bg-gray-100 text-button"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Account
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* --- Side Panel (Drawer) --- */}

      {/* 1. Backdrop Overlay (Darkens the background) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col p-4 space-y-2">
          {sidebarItems.map((item, index) => {
            const isActive = activeItem === item.label;
            return (
              <button
                key={index}
                onClick={() => {
                  handleItemClick(item.label);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold shadow-sm" // Active Style
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900" // Inactive Style
                }`}
              >
                <span
                  className={`text-xl transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                >
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>
    </>
  );
};

export default SellerNavBar;