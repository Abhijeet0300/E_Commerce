export const Constants = {
    APP_NAME: "Throttle",
    REGISTER : "Register",
    LOGIN : "Login"
} as const;

export type Constants =
  (typeof Constants)[keyof typeof Constants];