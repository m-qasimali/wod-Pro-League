/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { clearAdmin, setAdmin } from "../../redux/adminSlice";
import Loader from "../global/Loader";
import { decryptRole } from "../../utils/functions";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = decryptRole();
        const userValidData = {
          id: user.uid,
          email: user.email,
          role: role,
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
