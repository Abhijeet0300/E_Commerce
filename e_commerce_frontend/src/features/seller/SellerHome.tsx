// import React, { useState } from "react";
// import SellerNavBar from "./components/SellerNavBar.tsx"; // Adjust path as needed
// import { SellerConstants } from "./SellerConstants";
// import SellerDashboard from "./SellerDashboard.tsx";
// import AddBike from "./AddBike.tsx";
//
//
//
// const SellerHome: React.FC = () => {
//
//   const [activeTab, setactiveTab] = useState<string>(SellerConstants.DASHBOARD);
//
//   const renderContent =  () => {
//       switch (activeTab) {
//           case SellerConstants.DASHBOARD: {
//               return <SellerDashboard />;
//           }
//
//           case SellerConstants.ADD_BIKE: {
//               return <AddBike />;
//           }
//
//           default:
//               return (
//                   <div className="flex-1 flex items-center justify-center p-8">
//                       <h2 className="text-xl text-gray-500">
//                           Content for {activeTab} is under construction.
//                       </h2>
//                   </div>
//               );
//
//       }
//   };
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* 1. Navigation Bar at the top */}
//       <SellerNavBar activeItem={activeTab} setActiveItem={setactiveTab} />
//
//       {/* 2. Main Content Area */}
//         <div className="flex-1 w-full max-w-7xl mx-auto">
//             {renderContent()}
//         </div>
//     </div>
//   );
// };
//
// export default SellerHome;
