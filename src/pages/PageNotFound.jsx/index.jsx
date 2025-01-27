import Lottie from "lottie-react";
import PageNotFoundJSON from "../../assets/PageNotFound.json";

const PageNotFound = () => {
  return (
    <div className="h-screen w-full flex flex-row items-center justify-center">
      <Lottie
        animationData={PageNotFoundJSON}
        loop={true}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default PageNotFound;
