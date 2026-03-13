import type React from "react";

interface DropdownFieldProps {
    label: string;
    options: string[]; // The list of items you will pass in
    value: string;     // The currently selected value
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // The function to send data back
    placeholder?: string; // Optional: custom text for the default option
    required?: boolean;   // Optional: make it mandatory
}

const DropdownField: React.FC<DropdownFieldProps> = ({
                                                         label,
                                                         options,
                                                         value,
                                                         onChange,
                                                         placeholder = "Select an option",
                                                         required = false,
                                                     }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-shadow-gray-500 mb-2.5 text-[16px]">
                {label}
            </label>
            <select
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[16px] bg-white text-gray-700"
                required={required}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownField;