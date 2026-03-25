export const PageNavigation = {
    LOGIN_SCREEN : "/loginScreen",
    CUSTOMER_REGISTRATION_SCREEN : "/customerRegistrationScreen",
    SELLER_REGISTRATION_SCREEN : "/sellerRegistrationScreen",
    CUSTOMER_HOME_SCREEN : "/customerHomeScreen",
    SELLER_DASHBOARD : "/sellerDashboard",
    ADD_BIKE: "/addBike"
} as const;

export type PageNavigation =
  (typeof PageNavigation)[keyof typeof PageNavigation];