import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import InputTextField from "../../components/common/InputTextField";
import Button from "../../components/common/Button";

import {otpGenerate} from '../auth/AuthService';

const Registration: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    try{
        await otpGenerate(email);
        alert("Otp sent successfully.");
        navigate("/verify-otp", {state: {email: email, name: name, phoneNumber: phoneNumber, password: password} });
    } catch(error) {
        console.log(error)
    }
  };

  return (
    <>
      <div className="min-h-screen min-w-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center mb-8">E-Commerce App</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-6 text-center">Registration</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <InputTextField
              label="Name"
              inputType="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
            />
            <InputTextField
              label="Email"
              inputType="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            <InputTextField
              label="Phone"
              inputType="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
            <InputTextField
              label="Password"
              inputType="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            <InputTextField
              label="Confirm Password"
              inputType="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <div className="text-center">
              <Button text="Register" onClick={handleRegister} />
            </div>
          </form>
          <p className="mt-4 text-center">
            <Link to="/login" className="text-blue-500 hover:underline">
              Already have an account? Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Registration;
