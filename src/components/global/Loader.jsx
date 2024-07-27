import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex flex-row items-center justify-center">
      <HashLoader color="#B6B5FF" size={50} loading={true} />
    </div>
  );
};

export default Loader;
