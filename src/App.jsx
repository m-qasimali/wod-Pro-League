import { Provider } from "react-redux";
import "./App.css";
import CustomToaster from "./components/global/CustomToaster";
import Router from "./router/Router";
import { store } from "./redux/store";
import AuthProvider from "./components/AuthProvider";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <CustomToaster />
          <Router />
        </AuthProvider>
      </Provider>
    </>
  );
};

export default App;
