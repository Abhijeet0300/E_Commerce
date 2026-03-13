import type React from "react";

interface LoaderProps {
    message?: string; // Optional text to display under the spinner
    fullScreen?: boolean; // Option to make it an overlay over the whole page
}

const Loader: React.FC<LoaderProps> = ({ message = "Loading...", fullScreen = false }) => {
    const containerClasses = fullScreen
        ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm"
        : "flex flex-col items-center justify-center p-4";

    return (
        <div className={containerClasses}>
            {/* The Spinning Circle */}
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>

            {/* The Message */}
            <p className="mt-4 text-gray-600 font-medium text-sm animate-pulse">
                {message}
            </p>
        </div>
    );
};

export default Loader;