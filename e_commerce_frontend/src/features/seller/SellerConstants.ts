export const SellerConstants = {
  DASHBOARD: "Dashboard",
  ADD_BIKE: "Add Bike",
  TOTAL_BIKES: "Total Bikes",
  TOTAL_REVENUE: "Total Revenue",
  TOTAL_ORDERS: "Total Orders",
  PENDING_ORDERS: "Pending Orders"
} as const;

export type SellerConstants = (typeof SellerConstants)[keyof typeof SellerConstants];
