import React from "react";
import {
  Home,
  ShoppingBag,
  Package,
  BarChart2,
  Settings,
  Bike,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { name: "Home", icon: Home },
    { name: "Orders", icon: ShoppingBag },
    { name: "Add Motorcycles", icon: Bike },
    { name: "Products", icon: Package },
    { name: "Analytics", icon: BarChart2 },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full">
      {/* Logo Area */}
      <div className="p-8">
        <h1 className="text-4xl font-iceland! font-extrabold tracking-wider text-gray-900">
          THROTTLE
        </h1>
        <p className="text-xs space-grotesk-fontTheme font-semibold text-gray-400 tracking-widest mt-1">
          MERCHANT PORTAL
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 space-grotesk-fontTheme">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name; // Check if this item is active

          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)} // Change the tab on click
              className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#1a1a1a] text-white"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" strokeWidth={2} />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Profile/Storefront Block (Unchanged) */}
      {/* ... existing profile code ... */}
    </aside>
  );
};

export default Sidebar;
