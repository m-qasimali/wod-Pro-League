import "./App.css";
import CustomToaster from "./components/global/CustomToaster";
import Router from "./router/Router";

const App = () => {
  return (
    <>
      <CustomToaster />
      <Router />
    </>
  );
};

export default App;
