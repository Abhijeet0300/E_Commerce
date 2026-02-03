import type React from "react";

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="bg-blue-400! hover:shadow-lg text-white border-none px-4 py-2 rounded h-[50px] w-[150px] text-[18px]! text-center!"
      >
        {text}
      </button>
    );
}

export default Button;