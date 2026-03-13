import axios from "axios";

const API_URL: string = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const registerCustomer = async (
    payload : {name : string; email : string; phone : string; address : string; country: string; password: string },
) => {
    try {
        const response = await axios.post(`${API_URL}/customer/register`, payload);
        return response.data;
    } catch (error : any) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data.message || "Registration failed");
        } else {
            throw new Error("Network error. Please try again.");
        }
    }
};