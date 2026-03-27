import React from "react";
import { Banknote, ShoppingCart, Eye } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trendText: string;
  Icon: React.ElementType;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trendText,
  Icon,
}) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-40">
    <div className="flex justify-between items-start">
      <h3 className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
        {title}
      </h3>
      <Icon className="w-5 h-5 text-gray-400" />
    </div>
    <div>
      <h2 className="text-4xl font-black text-gray-900 tracking-tight">
        {value}
      </h2>
      <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">
        <span className="text-gray-900">{change}</span> {trendText}
      </p>
    </div>
  </div>
);

const StatCards: React.FC = () => {
  return (
    <div className="space-grotesk-fontTheme grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Sales"
        value="₹12,450.00"
        change="+12.5%"
        trendText="VS LAST MONTH"
        Icon={Banknote}
      />
      <StatCard
        title="New Orders"
        value="34"
        change="+4"
        trendText="SINCE YESTERDAY"
        Icon={ShoppingCart}
      />
      <StatCard
        title="Store Visits"
        value="1,200"
        change="+18%"
        trendText="TRAFFIC GROWTH"
        Icon={Eye}
      />
    </div>
  );
};

export default StatCards;
