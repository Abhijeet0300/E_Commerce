import type { MotorcycleData } from "./MotorcycleData";

export interface GetMotorcyclesResponse {
    success : boolean,
    message : string,
    data : MotorcycleData[]
}