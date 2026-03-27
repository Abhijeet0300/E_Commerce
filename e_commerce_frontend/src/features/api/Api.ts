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

export const registerSeller = async (
    payload : {ownerName : string, storeName:string, email : string, phone : string, password: string, address : string, country: string}
) => {
    try{
        const response = await axios.post(`${API_URL}/seller/register`, payload)
        return response.data;
    } catch (error : any) {
        throw new Error(error.message);
    }
}

export const loginSeller = async (
    payload : {email : string, password : string}
) => {
    try {
        const response = await axios.post(`${API_URL}/seller/login`, payload);
        return response.data;
    } catch (error : any) {
        throw new Error(error.message);
    }
}

export const addMotorcycle = async (
  token: string,
  payload: {
    motorcycleName: string;
    manufacturer: string;
    model: string;
    cc: number;
    bhp: number;
    torque: number;
    price: number;
    desc: string;
    sellerId: string;
    stockQuantity: number;
    imageUrls: string[];
  },
) => {
  if (!token) {
    throw new Error("No token found, please login.");
  }
  try {
    const response = await fetch(`${API_URL}/product/add-motorcycle`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//Get motorcycles api

export const getMotorcycles = async (token : string, sellerId : string) => {
    if (!token) {
      throw new Error("No token found, please login.");
    }

    if (!sellerId) {
      throw new Error("Seller ID is required to fetch inventory.");
    }

    try {
        const response = await fetch(`${API_URL}/product/get-motorcycles?sellerId=${sellerId}`, {
            method : "GET",
            headers : {
                "Content-type" : "application/json",
                Authorization: `Bearer ${token}`,
            },

        });
        const data = await response.json();
        return data;
    } catch ( error : any) {
        throw new Error(error.message);
    }
}

