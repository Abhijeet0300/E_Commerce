import React, { useEffect, useRef, useState } from "react";
import { Search, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageNavigation } from "../../../utils/PageNavigation";



const Navbar: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropDownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    localStorage.removeItem("role");
    alert("Logged out successfully.");
    setIsDropdownOpen(false);
    navigate(PageNavigation.LOGIN_SCREEN)
  };

  useEffect(() => {
    const handleClickOutside = (event : MouseEvent) => {
        if(dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    }
  },[]);

  return (
    <header className="h-15 shrink-0 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
      <h2 className="text-4xl font-iceland! font-black tracking-tight text-gray-900">
        DASHBOARD
      </h2>

      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="SEARCH SYSTEM..."
            className="bg-gray-100 text-xs font-semibold placeholder-gray-400 rounded-lg pl-10 pr-4 py-2.5 w-64 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* Icons */}
        <button className="text-gray-400 hover:text-gray-900 transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        <div className="relative" ref={dropDownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`transition-colors flex items-center focus:outline-none ${
              isDropdownOpen
                ? "text-gray-900"
                : "text-gray-400 hover:text-gray-900"
            }`}
          >
            <User className="w-5 h-5" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-4 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
              {/* Optional: A little header inside the dropdown */}
              <div className="px-4 py-2 border-b border-gray-50 mb-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  My Account
                </p>
              </div>

              {/* The Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};

export default Navbar;
