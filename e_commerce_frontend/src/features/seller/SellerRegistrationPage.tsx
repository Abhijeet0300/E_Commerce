import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputTextField from "../../components/common/InputTextField";
import Button from "../../components/common/Button";
import { otpGenerate, registerSeller } from "../auth/AuthService";
import OtpVerification from "../auth/OtpVerification";
import { VerificationType } from "../../utils/VerificationType";
import Title from "../../components/common/Title";

const SellerRegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    storeName: "",
    ownerName: "",
    supportEmail: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  let data = new Map<string, string>(
    [
      ["email", form.email],
      ["phoneNumber", form.phoneNumber],
      ["password", form.password],
      ["storeName", form.storeName],
      ["ownerName", form.ownerName],
      ["supportEmail", form.supportEmail],
      ["addressLine1", form.addressLine1],
      ["addressLine2", form.addressLine2],
      ["city", form.city],
      ["state", form.state],
      ["pincode", form.pincode],
      ["country", form.country],
    ]
  );

  const [step, setStep] = useState(1);


  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const handleRegister = async () => {
    if (
      !form.email ||
      !form.password ||
      !form.storeName ||
      !form.ownerName ||
      !form.phoneNumber ||
      !form.supportEmail ||
      !form.addressLine1 ||
      !form.addressLine2 ||
      !form.city ||
      !form.country ||
      !form.pincode ||
      !form.state
    ) {
      alert("Please fill all required fields");
      return;
    }

    const otpResponse = await otpGenerate(form.email);
    alert(otpResponse);
    setStep(2);
  };

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
                label="Email"
                inputType="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange("email")}
              />

              <InputTextField
                label="Phone Number"
                inputType="tel"
                placeholder="Enter phone number"
                value={form.phoneNumber}
                onChange={handleChange("phoneNumber")}
              />

              <InputTextField
                label="Password"
                inputType="password"
                placeholder="Create password"
                value={form.password}
                onChange={handleChange("password")}
              />

              <InputTextField
                label="Store Name"
                inputType="text"
                placeholder="Enter store name"
                value={form.storeName}
                onChange={handleChange("storeName")}
              />

              <InputTextField
                label="Owner Name"
                inputType="text"
                placeholder="Enter owner name"
                value={form.ownerName}
                onChange={handleChange("ownerName")}
              />

              <InputTextField
                label="Support Email"
                inputType="email"
                placeholder="Support email"
                value={form.supportEmail}
                onChange={handleChange("supportEmail")}
              />

              <InputTextField
                label="Address Line 1"
                inputType="text"
                placeholder="Address line 1"
                value={form.addressLine1}
                onChange={handleChange("addressLine1")}
              />

              <InputTextField
                label="Address Line 2"
                inputType="text"
                placeholder="Address line 2"
                value={form.addressLine2}
                onChange={handleChange("addressLine2")}
              />

              <InputTextField
                label="City"
                inputType="text"
                placeholder="City"
                value={form.city}
                onChange={handleChange("city")}
              />

              <InputTextField
                label="State"
                inputType="text"
                placeholder="State"
                value={form.state}
                onChange={handleChange("state")}
              />

              <InputTextField
                label="Pincode"
                inputType="text"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange("pincode")}
              />

              <InputTextField
                label="Country"
                inputType="text"
                placeholder="Country"
                value={form.country}
                onChange={handleChange("country")}
              />
            </div>

            <div className="flex justify-center mt-6">
              <Button text="Register" onClick={handleRegister} />
            </div>
          </div>
        </div>
      )}

      {
        step === 2 && (
          <OtpVerification verificationType= {VerificationType.SELLER_REGISTRATION} email= {form.email} data={data}/>
        )
      }
    </>
  );
};

export default SellerRegistrationPage;
