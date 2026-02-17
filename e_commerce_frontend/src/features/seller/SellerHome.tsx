import React from "react";
import SellerNavBar from "../seller/components/NavBar"; // Adjust path as needed

const SellerHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 1. Navigation Bar at the top */}
      <SellerNavBar />

      {/* 2. Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Seller Dashboard</h2>
          <p className="text-gray-500">Overview of your store performance</p>
        </div>

        {/* Placeholder for Dashboard Cards/Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Total Sales</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">$12,450</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Active Orders</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">24</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Products</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">156</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerHome;
