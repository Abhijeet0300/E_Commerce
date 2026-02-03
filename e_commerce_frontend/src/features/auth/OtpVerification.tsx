import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import InputTextField from "../../components/common/InputTextField";
import { otpGenerate, register, verifyOtp } from "./AuthService";

const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const name = location.state?.name;
  const phoneNumber = location.state?.phoneNumber;
  const password = location.state?.password;

  useEffect(() => {
    if(!email) {
        alert("No email found. Please register first.");
        navigate("/registration");
    }
  }, [email, navigate]);


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
    // Allow numbers only, max 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      setError("");
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    setIsLoading(true);
    
    try{
        const response = await verifyOtp(
            email.trim().toLowerCase(), 
            otp.trim()
        );
        alert( `OTP verified successfully. ${response}`);
        const registerResponse = await register(
            email.trim().toLowerCase(), 
            name.trim().toLowerCase(), 
            phoneNumber.trim(), 
            password.trim()
        )
        alert( `User registered successfully. ${registerResponse}`);
        navigate("/login");
    } catch(error : any) {
        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError("Something went wrong. Please try again.");
        }
    } finally {
        setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setTimer(30);
    setIsResendDisabled(true);
    setOtp("");
    setError("");
    const response = await otpGenerate(email);
    alert("Otp sent successfully.");
    console.log("Resend triggered...");
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
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
            onClick={handleVerify}
          />
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
