import type React from "react";
import { useEffect, useState } from "react";
import type { MotorcycleData } from "../responses/MotorcycleData";
import type { SellerData } from "../../seller/responses/SellerData";
import type { GetMotorcyclesResponse } from "../responses/GetMotorcyclesResponse";
import { getMotorcycles } from "../../api/Api";


const TableHeader = ({ text }: { text: string }) => (
  <th className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-gray-100">
    {text}
  </th>
);

const Products : React.FC = () => {
    const [motorcycleData, setMotorcycleData] = useState<MotorcycleData[]>([]);
    const [sellerId, setSellerId] = useState("");
    const [token, setToken] = useState("");

    const [activeTab, setActiveTab] = useState("All Stock");
    const tabs = ["All Stock", "In Stock", "Reserved", "Out of Stock"];
    
    useEffect(() => {
        const localToken = localStorage.getItem("token");
        const rawData = localStorage.getItem("data");

        const data = rawData ? (JSON.parse(rawData) as SellerData) : null;

        console.log(localToken);
        console.log(`SellerData: ${JSON.stringify(data)}`);

        if(localToken && data) {

            if (data.sellerId) {
              setSellerId(data.sellerId);
            }

            setToken(localToken);

            getMotorcyclesList(localToken, data.sellerId);
        }
    }, []);

    const getMotorcyclesList = async (token : string, sellerId : string) => {
        try {
            const response : GetMotorcyclesResponse = await getMotorcycles(token, sellerId);
            console.log(`Response Data: ${JSON.stringify(response.data)}`)
            if(response.success) {
                alert(response.message);
                console.log(`Response data: ${response.data}`);
                setMotorcycleData(response.data);
            } else {
                alert(response.message);
            }
        } catch(error : any) {
            alert(error.message);
        }
    };



    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
      }).format(amount);
    };

    // Returns a colored badge based on status string
    const StatusBadge = ({ status }: { status: string }) => {
      // Standardize status for comparison
      const upperStatus = status.toUpperCase();
      let colorClasses = "bg-gray-200 text-gray-700"; // Default (In Stock/Reserved)

      if (upperStatus === "OUT OF STOCK") {
        colorClasses = "bg-red-100 text-red-700";
      }

      return (
        <span
          className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${colorClasses}`}
        >
          {status}
        </span>
      );
    };

    // Standard Icon Components (SVG path approximations from image)
    const Icons = {
      Pencil: () => (
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      ),
      Trash: () => (
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
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      ),
      ChevronDown: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-3 h-3 ml-1 text-gray-900"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      ),
      GenericBike: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-12 h-12 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM21.75 17.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM6.75 6a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM16.5 6a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM3 9h18M6.75 3v18M16.5 3v18M3 15h18"
          />
        </svg>
      ),
    };

    return (
      <div className="bg-[#f9f9f9] min-h-screen p-10 space-grotesk-fontTheme text-gray-900">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black tracking-tight">
            All Motorcycles
          </h1>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg mb-8 border border-gray-100">
          {/* Tabs */}
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dropdowns */}
          <div className="flex items-center space-x-6 px-4">
            <div className="flex items-center text-[11px] font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-800">
              Manufacturer:{" "}
              <span className="text-gray-900 ml-2 normal-case font-medium text-sm">
                All Brands
              </span>
              <Icons.ChevronDown />
            </div>
            <div className="flex items-center text-[11px] font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-800">
              Sort By:{" "}
              <span className="text-gray-900 ml-2 normal-case font-medium text-sm">
                Newest First
              </span>
              <Icons.ChevronDown />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <TableHeader text="Product Details" />
                <TableHeader text="Manufacturer" />
                <TableHeader text="Technical Specs" />
                <TableHeader text="MRP (INR)" />
                <TableHeader text="Status" />
                <th className="pb-4 border-b border-gray-100 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {motorcycleData.length > 0 ? (
                motorcycleData.map((bike) => (
                  <tr
                    key={bike.id}
                    className="border-b border-gray-100 hover:bg-white transition-colors"
                  >
                    {/* Product Details (Image, Name, SKU) */}
                    <td className="py-6 flex items-center pr-4">
                      <div className="w-32 h-20 bg-gray-100 rounded overflow-hidden mr-6 flex-shrink-0 flex items-center justify-center border border-gray-200">
                        {bike.imageUrls && bike.imageUrls.length > 0 ? (
                          <img
                            src={bike.imageUrls[0]}
                            alt={bike.motorcycleName}
                            className="w-full h-full object-cover mix-blend-multiply"
                          />
                        ) : (
                          <Icons.GenericBike />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">
                          {bike.motorcycleName}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Model: {bike.model}
                        </p>
                      </div>
                    </td>

                    {/* Manufacturer */}
                    <td className="py-6 font-medium text-gray-700">
                      {bike.manufacturer}
                    </td>

                    {/* Technical Specs */}
                    <td className="py-6">
                      <div className="flex space-x-6">
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Displacement
                          </p>
                          <p className="font-medium text-sm text-gray-800">
                            {bike.cc} CC
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            BHP
                          </p>
                          <p className="font-medium text-sm text-gray-800">
                            {bike.bhp}
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Torque
                          </p>
                          <p className="font-medium text-sm text-gray-800">
                            {bike.torque} Nm
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* MSRP */}
                    <td className="py-6 font-bold text-gray-900 text-base">
                      {formatCurrency(bike.price)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-6">
                      <StatusBadge status={bike.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-6 text-right pr-2">
                      <div className="flex justify-end space-x-4 text-gray-400">
                        <button className="hover:text-gray-900 transition-colors">
                          <Icons.Pencil />
                        </button>
                        <button className="hover:text-red-600 transition-colors">
                          <Icons.Trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                // Empty State
                <tr>
                  <td colSpan={6} className="text-center py-20 text-gray-500">
                    <p className="text-4xl mb-4">🏍️</p>
                    <p className="font-medium">
                      No motorcycles found in your inventory.
                    </p>
                    <p className="text-sm mt-1">
                      Add your first product to see it here.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination Block */}
        <div className="flex justify-between items-center mt-10 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          <p>
            Showing {motorcycleData.length} of {motorcycleData.length}{" "}
            Motorcycles
          </p>

          {/* Mock Pagination (matches visual design) */}
          <div className="flex items-center space-x-1">
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors">
              &lt;
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-black text-white">
              1
            </button>
            {/* If there was actual pagination logic, it would go here */}
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors">
              &gt;
            </button>
          </div>
        </div>
      </div>
    );
}

export default Products;