export const VerificationType = {
    CUSTOMER_REGISTRATION : "CUSTOMER_REGISTRATION",
    CUSTOMER_LOGIN : "CUSTOMER_LOGIN",
    SELLER_REGISTRATION : "SELLER_REGISTRATION",
    SELLER_LOGIN : "SELLER_LOGIN",
    RESET_PASSWORD : "RESET_PASSWORD",
} as const;

export type VerificationType =
  (typeof VerificationType)[keyof typeof VerificationType];

