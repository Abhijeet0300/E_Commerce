import React from "react";

const SalesOverview: React.FC = () => {
  // Mock data to generate the bars. Heights are percentages.
  const chartData = [25, 35, 60, 55, 65, 40, 50, 55, 75, 45, 60, 80];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-12 space-grotesk-fontTheme">
        <h3 className="text-sm font-bold tracking-widest text-gray-900 uppercase">
          Sales Overview
        </h3>
        <div className="flex border border-gray-200 rounded-md overflow-hidden">
          <button className="px-4 py-1.5 text-[10px] font-bold bg-white text-gray-500 hover:text-gray-900">
            7 DAYS
          </button>
          <button className="px-4 py-1.5 text-[10px] font-bold bg-[#1a1a1a] text-white">
            30 DAYS
          </button>
        </div>
      </div>

      {/* Chart Mockup */}
      <div className="h-64 flex items-end justify-between space-x-2">
        {chartData.map((height, index) => (
          <div
            key={index}
            style={{ height: `${height}%` }}
            className={`w-full rounded-t-sm transition-all duration-300 ${
              index === 3 ? "bg-gray-500" : "bg-gray-200"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SalesOverview;
