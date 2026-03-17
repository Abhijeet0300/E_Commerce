import React, { useState, useEffect } from "react";
import Button from "../../components/common/Button.tsx";
import InputTextField from "../../components/common/InputTextField.tsx";
import Title from "../../components/common/Title.tsx";
import type {VerifiedOtpResponse} from "../../utils/otp/VerifiedOtpResponse.ts";
import {generateOtp, verifyOtp} from "../api/Api.ts";
import type {OtpResponse} from "../../utils/otp/OtpResponse.ts";


interface otpVerificationProps {
  email : string;
  onVerified: () => void;
}
const OtpVerification: React.FC<otpVerificationProps> = ({ email, onVerified}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let interval: any; // Using 'any' or 'number' avoids Node.js type dependency
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled, timer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      setError("");
    }
  };

  const handleResend = async () => {
    setIsLoading(true)
    setTimer(300);
    setIsResendDisabled(true);
    setOtp("");
    setError("");
    const response : OtpResponse = await generateOtp(email);
    if(response.success) {
      alert(response.success);
    } else {
      alert(response.message);
    }

    setIsLoading(false);
  };

  const onVerify = async () => {
    setIsLoading(true);

    try {
      const otpPayload = {
        email: email,
        otp: otp
      };
      const verifiedOtpResponse: VerifiedOtpResponse = await verifyOtp(otpPayload);

      if (verifiedOtpResponse.verified) {
        alert(verifiedOtpResponse.message);
        onVerified();
      } else {
        alert(verifiedOtpResponse.message);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Verification failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <Title />
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              OTP Verification
            </h2>
            <p className="text-gray-500 text-sm">
              Enter the code sent to your device.
            </p>
          </div>

          <div className="mb-2">
            <InputTextField
                label="Verification Code"
                inputType="text"
                placeholder="e.g. 123456"
                value={otp}
                onChange={handleChange}
            />
          </div>

          {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <div className="flex justify-between items-center mb-6 text-sm">
            <span className="text-gray-500">Didn't receive code?</span>
            <button
                onClick={handleResend}
                disabled={isResendDisabled}
                className={`font-medium ${
                    isResendDisabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-500 hover:underline"
                }`}
            >
              {isResendDisabled ? `Resend in ${timer}s` : "Resend Code"}
            </button>
          </div>

          <div className="flex justify-center">
            <Button
                text={isLoading ? "Verifying..." : "Verify"}
                onClick={onVerify}
            />
          </div>
        </div>
      </div>

    </>
  );
};

export default OtpVerification;