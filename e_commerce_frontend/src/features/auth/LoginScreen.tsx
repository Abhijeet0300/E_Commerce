import React, { useState } from "react";
import Button from "../../components/common/Button";
import InputTextField from "../../components/common/InputTextField";

type UserRole = "CUSTOMER" | "SELLER";

const LoginScreen: React.FC = () => {
  // State to track which login type is selected
  const [role, setRole] = useState<UserRole>("CUSTOMER");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle the final login action
  const handleLogin = () => {
    // In a real app, you would send this data to your Spring Boot backend here
    console.log(`Logging in as ${role} with:`, { email, password });
    alert(`Initiating ${role} Login...`);
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
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
            className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all duration-200 border ${
              role === "CUSTOMER"
                ? "bg-white text-blue-500 shadow-sm border-blue-500"
                : "text-gray-500 hover:text-gray-700 border-transparent!"
            }`}
          >
            Customer
          </button>

          <button
            onClick={() => setRole("SELLER")}
            className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all duration-200 border ${
              role === "SELLER"
                ? "bg-white text-blue-500 shadow-sm border-blue-500!"
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
          <Button
            text={role === "SELLER" ? "Seller Login" : "Customer Login"}
            onClick={handleLogin}
          />

          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
