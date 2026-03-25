import React from "react";
import { Home, ShoppingBag, Package, BarChart2, Settings } from "lucide-react";

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: "Home", icon: Home, active: true },
    { name: "Orders", icon: ShoppingBag, active: false },
    { name: "Products", icon: Package, active: false },
    { name: "Analytics", icon: BarChart2, active: false },
    { name: "Settings", icon: Settings, active: false },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full">
      {/* Logo Area */}
      <div className="p-8">
        <h1 className="text-4xl font-iceland! font-extrabold tracking-wider text-gray-900">
          THROTTLE
        </h1>
        <p className="text-xs font-semibold text-gray-400 tracking-widest mt-1">
          MERCHANT PORTAL
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href="#"
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-[#1a1a1a] text-white"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" strokeWidth={2} />
              {item.name}
            </a>
          );
        })}
      </nav>

      {/* Profile/Storefront Block */}
      <div className="p-4 m-4 bg-gray-100 rounded-xl">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center overflow-hidden mr-3">
            <img
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix"
              alt="Avatar"
              className="w-8 h-8"
            />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">
              PRECISION CONTROL
            </h4>
            <p className="text-[10px] text-gray-500 font-medium">Store Owner</p>
          </div>
        </div>
        <button className="w-full bg-[#1a1a1a] text-white text-xs font-bold py-3 rounded-lg hover:bg-black transition-colors">
          VIEW STOREFRONT
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
