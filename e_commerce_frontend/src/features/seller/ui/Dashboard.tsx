import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCards from "../components/StatCards";
import SalesOverview from "../components/SalesOverview";
import RecentOrders from "../components/RecentOrders";
import AddBike from "../../products/ui/AddBike";
import Products from "../../products/ui/Products";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      {/* 1. Menu Bar (Sidebar) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* 2. Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <main className="flex-1 p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* 3. Cards */}
          {activeTab === "Home" && (
            <>
              {<StatCards />}
              {<SalesOverview />}
              {<RecentOrders />}
            </>
          )}

          {activeTab === "Add Motorcycles" && (
            <>
              <AddBike />
            </>
          )}

          {activeTab === "Products" && (
            <>
            <Products />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
