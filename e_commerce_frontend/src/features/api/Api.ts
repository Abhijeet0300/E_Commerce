import axios from "axios";

const API_URL: string = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// Inside Api.ts
export const generateOtp = async (email: string) => {
    try {
        const response = await axios.post(`${API_URL}/otp/send-otp`, null, {
            params: {
                email: email,
            }
        });
        return response.data;
    } catch (error : any) {
        throw new Error(error.message);
    }
};

export const verifyOtp = async (payload : {email : string, otp : string}) => {
    try {
        const response = await axios.post(`${API_URL}/otp/verify-otp`, payload);
        return response.data;
    } catch (error : any) {
        throw new Error(error.message);
    }
}

