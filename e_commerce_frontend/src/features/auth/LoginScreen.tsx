import React, {useEffect, useState} from "react";
import Button from "../../components/common/Button.tsx";
import InputTextField from "../../components/common/InputTextField.tsx";
import { useNavigate } from "react-router-dom";
import { Constants } from "../../utils/Constants.ts";
import { PageNavigation } from "../../utils/PageNavigation.ts";
import Title from "../../components/common/Title.tsx";
import type {LoginSellerResponse} from "../seller/responses/LoginSellerResponse.ts";
import {loginSeller} from "../api/Api.ts";

type UserRole = "CUSTOMER" | "SELLER";

const LoginScreen: React.FC = () => {

  const [role, setRole] = useState<UserRole>("CUSTOMER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const payload = {
    email : email,
    password: password
  }

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    localStorage.removeItem("role");

    // 1. Check for incoming Google OAuth data in the URL
    const searchParams = new URLSearchParams(location.search);
    const urlToken = searchParams.get("token");
    const urlRole = searchParams.get("role");
    const urlData = searchParams.get("data");

    if (urlToken && urlData) {
      // Decode and save the new session
      const jsonString = decodeURIComponent(urlData);
      localStorage.setItem("token", urlToken);
      localStorage.setItem("data", jsonString);
      localStorage.setItem("role", urlRole || "CUSTOMER");

      // FIX: Instantly navigate the user to their dashboard so the URL cleans up!
      navigate(PageNavigation.CUSTOMER_HOME_SCREEN);

      return; // Stop the useEffect from running any further
    }

    // 2. If no URL params, check if they are ALREADY logged in from a past visit
    const localToken = localStorage.getItem("token");
    const localRole = localStorage.getItem("role");

    if (localToken) {
      if (localRole === "SELLER") {
        navigate(PageNavigation.SELLER_DASHBOARD);
      } else {
        // Defaults to Customer
        navigate(PageNavigation.CUSTOMER_HOME_SCREEN);
      }
    }
  }, [navigate, location]);

  const handleLogin = async () => {

    if (role.includes("CUSTOMER")) {
      alert("Login successfully");
    } else {
      try {
        const response : LoginSellerResponse = await loginSeller(payload);
        if(response.success) {
          localStorage.setItem("token", response.jwtToken);
          localStorage.setItem("data", JSON.stringify(response.data));
          localStorage.setItem("role", "SELLER");
          alert(response.message);
          navigate(PageNavigation.SELLER_DASHBOARD);
        } else {
          alert(response.message);
        }
      } catch (error : any) {
        alert(error.message);
      }
    }

  };

  const handleRegisterRedirect = () => {
    if (role.includes("CUSTOMER")) {
      navigate(PageNavigation.CUSTOMER_REGISTRATION_SCREEN);
    } else {
      navigate(PageNavigation.SELLER_REGISTRATION_SCREEN);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-white flex flex-col">
      <Title />
      <div className="flex-1 w-full flex items-center justify-center font-sans">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-gray-100">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500">Please choose your login type</p>
          </div>

          {/* Role Toggles (Customer vs Seller) */}
          <div className="flex bg-gray-200 p-1 gap-2 rounded-lg mb-8">
            <button
              onClick={() => setRole("CUSTOMER")}
              className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all duration-200 focus:outline-none! focus:ring-0! ${
                role === "CUSTOMER"
                  ? "bg-button! text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Customer
            </button>

            <button
              onClick={() => setRole("SELLER")}
              className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all duration-200 focus:outline-none! focus:ring-0! ${
                role === "SELLER"
                  ? "bg-button! text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 border-transparent!"
              }`}
            >
              Seller
            </button>
          </div>

          {/* Form Inputs using your custom component */}
          <div className="space-y-2">
            <InputTextField
              label={role === "SELLER" ? "Business Email" : "Personal Email"}
              inputType="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputTextField
              label="Password"
              inputType="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Action Section */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <Button text={Constants.LOGIN} onClick={handleLogin} />

            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot your password?
            </a>
          </div>

          {/* --- NEW SOCIAL LOGIN SECTION (CUSTOMERS ONLY) --- */}
          {role === "CUSTOMER" && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {/* Google Button */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                  // 1. Point this straight back to Spring Boot's default Google endpoint!
                  onClick={() =>
                    (window.location.href =
                      "http://localhost:8080/oauth2/authorization/google")
                  }
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>

                {/* Facebook Button */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm bg-[#1877F2] text-sm font-medium text-white hover:bg-[#166FE5] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2]"
                  onClick={() => alert("Facebook Login Triggered")}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          )}
          {/* ------------------------------------ */}

          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="mb-2">
              {role === "CUSTOMER"
                ? "Don't have a customer account?"
                : "Don't have a seller account?"}
            </p>

            <Button
              text={Constants.REGISTER}
              onClick={handleRegisterRedirect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
