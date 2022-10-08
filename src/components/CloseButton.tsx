export const CloseButton = ({
  onClick = () => null
}: {
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="absolute transition-opacity top-2 right-2 text-gray-500 opacity-5 hover:text-gray-200 group-hover:opacity-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};
