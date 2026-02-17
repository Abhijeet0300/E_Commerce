import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { customerLogin } from "./AuthService";

import InputTextField from "../../components/common/InputTextField";
import Button from "../../components/common/Button";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await customerLogin(email, password);
      alert("Logged in");
      navigate("/home");
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <div className="min-h-screen min-w-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center mb-8">E-Commerce App</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <InputTextField
              label="Email"
              inputType="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            <InputTextField
              label="Password"
              inputType="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="text-center">
              <Button text="Login" onClick={handleLogin} />
            </div>
          </form>
          <p className="mt-4 text-center">
            <Link to="/registration" className="text-blue-500 hover:underline">
              Click here to register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
