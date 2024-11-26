import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "@/components/global/Loader";
import { getWorkoutTeams } from "@/redux/features/result/ResultThunk";
import TeamTable from "./TeamTable";

const ParticipatedTeams = () => {
  const { workoutId } = useParams();
  const { workoutTeams } = useSelector((state) => state.results);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      setLoading(true);
      await dispatch(getWorkoutTeams(workoutId)).unwrap();
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!workoutTeams[workoutId]) {
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
      <TeamTable />
    </div>
  );
};

export default ParticipatedTeams;
