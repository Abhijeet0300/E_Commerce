import axios from "axios";

const API_URL: string = "http://localhost:8080/api";

export const registerCustomer = async (data: Map<string, string>) => {
  const payload = Object.fromEntries(data);
  try {
    const response = await axios.post(
      `${API_URL}/customer/register`,
      payload,
      { headers: { "Content-Type": "application/json" } },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Customer Login
export const customerLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/customer/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const otpGenerate = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/generate-otp`, null, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  const response = await axios.post(`${API_URL}/auth/verify-otp`, null, {
    params: { email, otp },
  });
  return response.data;
};


//Seller Login

export const sellerLogin = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/seller/login`, {
      email,
      password,
    });
    return response.data;
};

export const registerSeller = async (data: Map<string, string>) => {
  const payload = Object.fromEntries(data);
  try {
    const response = await axios.post(`${API_URL}/seller/register`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
