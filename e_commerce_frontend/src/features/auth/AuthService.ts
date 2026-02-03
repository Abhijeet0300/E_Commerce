import axios from "axios";

const API_URL : string = "http://localhost:8080/api";

export const register = async(email:string, name:string, phoneNumber:string, password:string) => {
    try{
        const response = await axios.post(`${API_URL}/users/auth/register`, {email, name, phoneNumber, password});
        return response.data;
    }catch (error) {
        throw error;
    }
};

export const login = async(email:string, password:string) => {
    try{
        const response = await axios.post(`${API_URL}/users/auth/login`, {email, password});
        return response.data;
    }catch (error) {
        throw error;
    }
}

export const otpGenerate = async(email:string) => {
    try{
        const response = await axios.post(`${API_URL}/auth/generate-otp`, null, {params: {email}});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const verifyOtp = async(email: string, otp: string) => {
    const response = await axios.post(`${API_URL}/auth/verify-otp`, null, {
      params: { email, otp },
    });
    return response.data;
}