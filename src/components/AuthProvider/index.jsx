/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { clearAdmin, setAdmin } from "../../redux/adminSlice";
import Loader from "../global/Loader";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userValidData = {
          uid: user.uid,
          email: user.email,
        };

        dispatch(setAdmin(userValidData));
      } else {
        dispatch(clearAdmin());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  } else {
    return children;
  }
};

export default AuthProvider;
