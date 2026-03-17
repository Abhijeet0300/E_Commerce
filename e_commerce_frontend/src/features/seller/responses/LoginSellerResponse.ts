import type {SellerData} from "./SellerData.ts";

export interface LoginSellerResponse {
    success : boolean;
    jwtToken : string;
    message : string;
    data : SellerData;
}