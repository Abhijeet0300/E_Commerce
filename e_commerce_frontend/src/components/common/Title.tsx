import type React from "react";
import { Constants } from "../../utils/Constants";

const Title: React.FC = () => {
  return (
    <header className="w-full flex justify-center items-center py-6">
      <h1 className="font-iceland! text-7xl font-bold text-gray-800 tracking-wide">
        {Constants.APP_NAME}
      </h1>
    </header>
  );
};

export default Title;
