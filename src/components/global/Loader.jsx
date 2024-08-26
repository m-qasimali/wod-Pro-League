import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex flex-row items-center justify-center mt-20 w-full">
      <HashLoader color="#B6B5FF" size={50} loading={true} />
    </div>
  );
};

export default Loader;
