import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCards from "../components/StatCards";
import SalesOverview from "../components/SalesOverview";
import RecentOrders from "../components/RecentOrders";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      {/* 1. Menu Bar (Sidebar) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* 2. Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <main className="flex-1 p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* 3. Cards */}
          <StatCards />

          {/* 4. Sales Overview */}
          <SalesOverview />

          {/* 5. Recent Orders */}
          <RecentOrders />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
