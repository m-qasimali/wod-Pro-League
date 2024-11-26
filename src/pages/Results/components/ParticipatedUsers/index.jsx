import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserTable from "./UserTable";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "@/components/global/Loader";
import { getWorkoutUsers } from "@/redux/features/result/ResultThunk";

const ParticipatedUsers = () => {
  const { workoutId } = useParams();
  const { workoutUsers } = useSelector((state) => state.results);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      setLoading(true);
      await dispatch(getWorkoutUsers(workoutId)).unwrap();
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!workoutUsers[workoutId]) {
      getData();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <UserTable />
    </div>
  );
};

export default ParticipatedUsers;
