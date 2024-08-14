import { useState } from "react";
import Logo from "../../../assets/images/Logo.png";
import { Icons } from "../../../components/global/icons";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/global/Spinner";
import PasswordInput from "../../../components/global/PasswordInput";
import { isValidEmail } from "../../../utils/functions";

const initialState = {
  email: "",
  password: "",
};

export const Login = () => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "") {
      return toast.error("Please fill all the fields!");
    }

    if (!isValidEmail(data.email)) {
      return toast.error("Invalid email address!");
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/workouts", { replace: true });
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-background">
      <div className="px-4 w-full sm:w-2/3 md:w-1/3 flex flex-col items-center">
        <div>
          <img src={Logo} alt="logo" />
        </div>
        <div className="text-text mb-10 flex flex-col items-center">
          <p className="font-bold text-3xl">Welcome Admin!</p>
          <p className="text-sm font-normal text-opacity-50">
            Please Login to continue
          </p>
        </div>

        <form className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor={"email"}>
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={handleChange}
                name="email"
                disabled={loading}
                className="w-full pr-10 border border-black border-opacity-10 rounded-md p-2 outline-none focus-within:border-primary"
                required
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                <Icons.Email className="w-5 h-5" />
              </span>
            </div>
          </div>

          <PasswordInput
            state={data.password}
            handleChange={handleChange}
            loading={loading}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-10 bg-primary text-white font-semibold text-lg py-1 hover:bg-opacity-80 rounded-md flex flex-row items-center justify-center"
          >
            {loading ? <Spinner /> : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
};
