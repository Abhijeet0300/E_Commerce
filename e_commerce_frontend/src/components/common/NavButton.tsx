
interface NavButtonProps {
    onNavButtonClick: () => void;
}
const NavButton:React.FC<NavButtonProps> = ({onNavButtonClick}) => {
    return (
      <button
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
        onClick={onNavButtonClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    );
}

export default NavButton;