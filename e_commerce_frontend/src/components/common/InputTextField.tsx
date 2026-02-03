import React, {useState}  from "react";

interface InputTextFieldProps {
  label: string;
  inputType: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputTextField : React.FC<InputTextFieldProps> = ({label, inputType, placeholder, value, onChange}) => {
    return (
      <>
        <div className="mb-4">
          <label
            htmlFor="textInput"
            className="block text-sm font-medium text-shadow-gray-500 mb-2.5 text-[16px]"
          >
            {label}
          </label>
          <input
            type={inputType}
            id="textInput"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[16px]"
          />
        </div>
      </>
    );
};

export default InputTextField;