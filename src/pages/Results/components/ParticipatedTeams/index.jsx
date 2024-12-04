import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "@/components/global/Loader";
import { subscribeToWorkoutTeamsThunk } from "@/redux/features/result/ResultThunk";
import TeamTable from "./TeamTable";
import SearchField from "@/components/global/SearchField";
import TeamFilter from "./TeamFilter";
import {
  setFilters,
  setSearchQuery,
} from "@/redux/features/result/ResultSlice";

const ParticipatedTeams = () => {
  const { workoutId } = useParams();
  const { workoutTeams } = useSelector((state) => state.results);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [unsubscribe, setUnsubscribe] = useState(null);

  useEffect(() => {
    dispatch(setSearchQuery(searchValue));
  }, [dispatch, searchValue]);

  useEffect(() => {
    return () => {
      dispatch(
        setFilters({
          category: "",
          status: "",
        })
      );

      // Unsubscribe from real-time updates
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [dispatch, unsubscribe]);

  useEffect(() => {
    if (!workoutTeams[workoutId]) {
      const subscribe = async () => {
        try {
          setLoading(true);
          const unsub = await dispatch(
            subscribeToWorkoutTeamsThunk(workoutId)
          ).unwrap();
          setUnsubscribe(() => unsub);
        } catch (error) {
          toast.error(error);
        } finally {
          setLoading(false);
        }
      };

      subscribe();
    } else {
      setLoading(false);
    }
  }, [dispatch, workoutId, workoutTeams]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky z-10 ">
        <p className="font-bold text-2xl">Manage Users</p>
        <div className="flex flex-col sm:flex-row justify-between my-4 gap-2">
          <div className="flex flex-row gap-2">
            <div className="w-full sm:w-auto">
              <SearchField state={searchValue} setState={setSearchValue} />
            </div>
            <TeamFilter />
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar z-0">
        <TeamTable />
      </div>
    </div>
  );
};

export default ParticipatedTeams;
