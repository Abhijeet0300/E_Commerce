import React, { useState } from "react";
import Button from "../../components/common/Button";
import InputTextField from "../../components/common/InputTextField";
import { customerLogin } from "./AuthService";
import { useNavigate } from "react-router-dom";
import { Constants } from "../../utils/Constants";
import { PageNavigation } from "../../utils/PageNavigation";
import Title from "../../components/common/Title";

type UserRole = "CUSTOMER" | "SELLER";

const LoginScreen: React.FC = () => {
  const [role, setRole] = useState<UserRole>("CUSTOMER");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (role.includes("CUSTOMER")) {
      const customerLoginResponse = await customerLogin(email, password);
      alert(customerLoginResponse);
    } else {
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
