import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserTable from "./UserTable";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "@/components/global/Loader";
import { getWorkoutUsers } from "@/redux/features/result/ResultThunk";
import SearchField from "@/components/global/SearchField";
import UserFilter from "./UserFilter";
import {
  setFilters,
  setSearchQuery,
} from "@/redux/features/result/ResultSlice";

const ParticipatedUsers = () => {
  const { workoutId } = useParams();
  const { workoutUsers } = useSelector((state) => state.results);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

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
    };
  }, [dispatch]);

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
    <div className="flex flex-col h-screen">
      <div className="sticky z-10 ">
        <p className="font-bold text-2xl">Manage Users</p>
        <div className="flex flex-col sm:flex-row justify-between my-4 gap-2">
          <div className="flex flex-row gap-2">
            <div className="w-full sm:w-auto">
              <SearchField state={searchValue} setState={setSearchValue} />
            </div>
            <UserFilter />
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar z-0">
        <UserTable />
      </div>
    </div>
  );
};

export default ParticipatedUsers;
