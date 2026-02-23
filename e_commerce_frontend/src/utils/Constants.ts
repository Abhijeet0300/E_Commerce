export const Constants = {
    APP_NAME: "Throttle",
    REGISTER : "Register",
    LOGIN : "Login",
    SELLER: "Seller",
    SELLER_LOGIN_SUCCESSFUL: "Seller login successful",
    ADD_BIKE_TITLE: "Add Bike"
} as const;

export type Constants =
  (typeof Constants)[keyof typeof Constants];