import React from "react";

interface Order {
  id: string;
  name: string;
  status: "SHIPPED" | "PENDING";
  amount: string;
}

const RecentOrders: React.FC = () => {
  const orders: Order[] = [
    {
      id: "#TH-9482",
      name: "Alexander Pierce",
      status: "SHIPPED",
      amount: "$2,450.00",
    },
    {
      id: "#TH-9481",
      name: "Elena Rodriguez",
      status: "PENDING",
      amount: "$840.25",
    },
    {
      id: "#TH-9480",
      name: "Marcus Thorne",
      status: "SHIPPED",
      amount: "$1,120.00",
    },
    {
      id: "#TH-9479",
      name: "Sarah Jenkins",
      status: "SHIPPED",
      amount: "$3,200.50",
    },
    {
      id: "#TH-9478",
      name: "David Chen",
      status: "PENDING",
      amount: "$150.00",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden space-grotesk-fontTheme">
      <div className="p-8 border-b border-gray-100">
        <h3 className="text-sm font-bold tracking-widest text-gray-900 uppercase">
          Recent Orders
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-8 py-4 text-[10px] font-extrabold tracking-widest text-gray-500 uppercase border-b border-gray-100">
                Order ID
              </th>
              <th className="px-8 py-4 text-[10px] font-extrabold tracking-widest text-gray-500 uppercase border-b border-gray-100">
                Customer Name
              </th>
              <th className="px-8 py-4 text-[10px] font-extrabold tracking-widest text-gray-500 uppercase border-b border-gray-100">
                Status
              </th>
              <th className="px-8 py-4 text-[10px] font-extrabold tracking-widest text-gray-500 uppercase border-b border-gray-100 text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-5 text-xs font-bold text-gray-600">
                  {order.id}
                </td>
                <td className="px-8 py-5 text-xs font-medium text-gray-900">
                  {order.name}
                </td>
                <td className="px-8 py-5">
                  <span className="bg-gray-200 text-gray-700 text-[9px] font-black px-2.5 py-1 rounded-sm tracking-wider uppercase">
                    {order.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-xs font-bold text-gray-900 text-right">
                  {order.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-100 text-center text-gray-500">
        <button className="text-[10px] font-bold tracking-widest uppercase hover:text-gray-900 transition-colors">
          View All Orders
        </button>
      </div>
    </div>
  );
};

export default RecentOrders;
