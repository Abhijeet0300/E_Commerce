import React, {type ChangeEvent, useEffect} from "react";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

import InputTextField from "../../components/common/InputTextField";
import Button from "../../components/common/Button";

import OtpVerification from "./OtpVerification";
import Title from "../../components/common/Title";
import { PageNavigation } from "../../utils/PageNavigation";
import {fetchAllCountryByNames} from "../api/OtherApis.ts";
import DropdownField from "../../components/common/DropdownField.tsx";
import {generateOtp} from "../api/Api.ts";
import type {OtpResponse} from "../../utils/otp/OtpResponse.ts";
import Loader from "../../components/common/Loader.tsx";
import type {RegisterCustomerResponse} from "./models/RegisterCustomerResponse.ts";
import {registerCustomer} from "./CustomerApis.ts";

const CustomerRegistration: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [buttonText, setButtonText] = useState("Send Otp");

  const navigate = useNavigate();

  const payload = {
    name: name,
    email: email,
    phone: phoneNumber,
    address: address,
    country: country,
    password: password
  }

  useEffect(() => {
    const loadCountries = async () => {
      const response = await fetchAllCountryByNames();
      setCountries(response);
    };
    loadCountries();
  }, []);

  const validateForm = () => {
    if (
        !name.trim() ||
        !email.trim() ||
        !phoneNumber.trim() ||
        !address.trim() ||
        !country ||
        !password ||
        !confirmPassword
    ) {
      alert("All fields are required. Please fill out the entire form.");
      return false;
    }
    return true;
  }

  const handleCountryChange = (event : ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  }
  const handleAddressChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  }
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
    if(!validateForm()) {
      return;
    }

    if(isEmailVerified) {
      alert("Email verified");
      setStep(3);
      try {
        const response : RegisterCustomerResponse = await registerCustomer(payload);
        if(response.registered) {
          alert(response.message);
          navigate(PageNavigation.LOGIN_SCREEN);
        } else {
          alert(response.message);
          setStep(1);
        }
      } catch (error : any) {
        alert(error.message);
        setStep(1);
      }
      return;
    } else {
      try {
        setStep(3);
        const response : OtpResponse = await generateOtp(email);
        if(response.success) {
          alert(response.message);
          setButtonText("Register");
          setStep(2);
        } else {
          alert(response.message);
          setStep(1);
        }
      } catch (error : any) {
        alert(error.message);
        setStep(1);
      }
      return;
    }
  };

  const handleVerificationSuccess = () => {
    setIsEmailVerified(true);
    setStep(1);
  }


  return (
    <>
      {step === 1 && (
        <div className="min-h-screen min-w-screen bg-white flex flex-col items-center justify-center">
          <Title />
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Registration
            </h2>
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
                label="Address"
                inputType="text"
                placeholder="Enter your address"
                value={address}
                onChange={handleAddressChange}
                />
              <DropdownField
                label="Country"
                options={countries}
                value={country}
                onChange={handleCountryChange}
                placeholder="Select your country"
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
                <Button text={buttonText} onClick={handleRegister} />
              </div>
            </form>
            <p className="mt-4 text-center">
              <Link to={PageNavigation.LOGIN_SCREEN} className="text-blue-500 hover:underline">
                Already have an account? Login here
              </Link>
            </p>
          </div>
        </div>
      )}

      {step === 2 && (
        <OtpVerification
          email={email}
          onVerified={handleVerificationSuccess}
        />
      )}

      {step === 3 && (<Loader />)}

    </>
  );
};

export default CustomerRegistration;
