import {Constants} from "../../../utils/Constants.ts";
import type React from "react";

const AddBikeTitle: React.FC = () => {
    return (
        <header className="w-full flex justify-center items-center py-6">
            <h1 className="font-iceland! text-7xl font-bold text-gray-800 tracking-wide">
                {Constants.ADD_BIKE_TITLE}
            </h1>
        </header>
    );
}

export default AddBikeTitle;