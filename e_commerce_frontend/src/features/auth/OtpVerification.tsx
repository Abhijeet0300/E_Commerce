import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import InputTextField from "../../components/common/InputTextField";
import { otpGenerate, registerCustomer, registerSeller, verifyOtp } from "./AuthService";
import {VerificationType} from "../../utils/VerificationType";
import { PageNavigation } from "../../utils/PageNavigation";
import Title from "../../components/common/Title";


interface otpVerificationProps {
  verificationType : VerificationType;
  email : string;
  data : Map<string, string>;
}
const OtpVerification: React.FC<otpVerificationProps> = ({verificationType, email,  data}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

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
    setTimer(120);
    setIsResendDisabled(true);
    setOtp("");
    setError("");
    const response = await otpGenerate(email);
    alert("Otp sent successfully.");
    console.log("Resend triggered...");
  };

  const onVerify = async () => {
    switch(verificationType) {
      case VerificationType.CUSTOMER_REGISTRATION: {
        try {
          const registerResponse = await registerCustomer(data);
          alert(registerResponse);
          navigate(PageNavigation.LOGIN_SCREEN);
        } catch(error) {
          console.log(error);
        }
        break;
      }

      case VerificationType.SELLER_REGISTRATION: {
        const registerResponse = await registerSeller(data);
        alert(registerResponse);
        navigate(PageNavigation.LOGIN_SCREEN);
        break;
      }

      default : {
        alert("Verification Type not supported.")
      }
    }
  }

  return (
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
  );
};

export default OtpVerification;