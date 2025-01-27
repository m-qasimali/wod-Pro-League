const CustomButton = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary text-white px-5 py-2 text-sm rounded-full hover:bg-opacity-80"
    >
      {title}
    </button>
  );
};

export default CustomButton;
