import React, {type ChangeEvent, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import InputTextField from "../../components/common/InputTextField.tsx";
import Button from "../../components/common/Button.tsx";
import OtpVerification from "./OtpVerification.tsx";
import Title from "../../components/common/Title.tsx";
import type {RegisteredSellerResponse} from "../seller/responses/RegisteredSellerResponse.ts";
import {generateOtp, registerSeller} from "../api/Api.ts";
import {PageNavigation} from "../../utils/PageNavigation.ts";
import type {OtpResponse} from "../../utils/otp/OtpResponse.ts";
import Loader from "../../components/common/Loader.tsx";
import {fetchAllCountryByNames} from "../api/OtherApis.ts";
import DropdownField from "../../components/common/DropdownField.tsx";

const SellerRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const[buttonText, setButtonText] = useState<string>("Verify email");
  const[isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>([]);

  const[country, setCountry] = useState("");

  const[ownerName, setOwnerName] = useState<string>("");
  const[storeName, setStoreName] = useState<string>("");
  const[phone, setPhone] = useState<string>("");
  const[email, setEmail] = useState<string>("");
  const[password, setPassword] = useState<string>("");
  const[confirmPassword, setConfirmPassword] = useState<string>("");
  const[address, setAddress] = useState<string>("");


  const payload = {
      ownerName: ownerName,
      storeName: storeName,
      email: email,
      phone: phone,
      password: password,
      address: address,
      country: country
  };

  const [step, setStep] = useState(1);

    useEffect(() => {
        const loadCountries = async () => {
            const response = await fetchAllCountryByNames();
            setCountries(response);
        };
        loadCountries();
    }, []);

  const handleCountryChange = (event : ChangeEvent<HTMLSelectElement>) => {
        setCountry(event.target.value);
  }

  const handleOwnerNameChange = (event : ChangeEvent<HTMLInputElement>) => {
      setOwnerName(event.target.value);
  }

  const handleStoreNameChange = (event : ChangeEvent<HTMLInputElement>) => {
      setStoreName(event.target.value);
  }

  const handlePhoneChange = (event : ChangeEvent<HTMLInputElement>) => {
      setPhone(event.target.value);
  }

  const handleEmailChange = (event : ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
  }

  const handlePasswordChange = (event : ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
  }

  const handleConfirmPasswordChange = (event : ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.target.value);
  }
  const handleAddressChange = (event : ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value);
  }


  const handleRegister = async () => {
    if (
        !email.trim() ||
        !password ||
        !storeName.trim() ||
        !ownerName.trim() ||
        !country ||
        !address.trim() ||
        !confirmPassword
    ) {
      alert("Please fill all required fields");
      return;
    }

    if(password !== confirmPassword) {
        alert("Passwords don't match");
        return;
    }

    if(isEmailVerified) {
        try {
            setStep(3);
            const response : RegisteredSellerResponse = await registerSeller(payload)
            if(response.success) {
                alert(response.message);
                navigate(PageNavigation.LOGIN_SCREEN)
            } else {
                alert(response.message);
                setStep(1);
            }
        } catch (error : any) {
            alert(error.message);
            setStep(1);
        }
    } else {
        try {
            setStep(3);
            const response : OtpResponse = await generateOtp(email);
            if(response.success) {
                alert(response.message);
                setStep(2);
            } else {
                alert(response.message);
            }
        } catch (error : any) {
            alert(error.message);
        }
    }
  };

  const handleEmailVerification = () => {
      setIsEmailVerified(true);
      setButtonText("Register");
      setStep(1);
  }

  return (
    <>
      {step === 1 && (
        <div className="min-h-screen min-w-screen bg-white flex flex-col items-center justify-center p-4">
          <Title />
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-center mb-6">
              Seller Registration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <InputTextField
                    label="Owner Name"
                    inputType="text"
                    placeholder="Enter owner name"
                    value={ownerName}
                    onChange={handleOwnerNameChange}
                />

                <InputTextField
                    label="Store Name"
                    inputType="text"
                    placeholder="Enter store name"
                    value={storeName}
                    onChange={handleStoreNameChange}
                />

                <InputTextField
                    label="Email"
                    inputType="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                />

                <InputTextField
                    label="Phone Number"
                    inputType="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                />

                <InputTextField
                    label="Password"
                    inputType="password"
                    placeholder="Create password"
                    value={password}
                    onChange={handlePasswordChange}
                />

                <InputTextField
                    label="Confirm password"
                    inputType="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />

                <InputTextField
                    label="Address Line 1"
                    inputType="text"
                    placeholder="Address line 1"
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

            </div>

            <div className="flex justify-center mt-6">
              <Button text={buttonText} onClick={handleRegister} />
            </div>
          </div>
        </div>
      )}

      {
        step === 2 && (
          <OtpVerification email={email} onVerified={handleEmailVerification}/>
        )
      }

        {step === 3 && (<Loader />)}
    </>
  );
};

export default SellerRegistrationPage;
