/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../../../components/global/icons";
import { useEffect, useState } from "react";
import { changeTeamCategory } from "../../../redux/teamSlice";
import toast from "react-hot-toast";
import SelectField from "../../../components/global/SelectField";
import Spinner from "../../../components/global/Spinner";
import { categories } from "@/constant/categories";

const getCategory = (value) => {
  return categories.find((category) => category.includes(value));
};

const CategoryEditPopup = ({ close, team }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    getCategory(team?.teamCategory)
  );
  const dispatch = useDispatch();
  const { loadingCategoryChange, categoryChangeError } = useSelector(
    (state) => state.team
  );
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (getCategory(selectedCategory) !== getCategory(team?.teamCategory)) {
      setIsUpdated(true);
    } else {
      setIsUpdated(false);
    }
  }, [selectedCategory, team]);

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCategoryChange = async () => {
    try {
      const category = selectedCategory;
      await dispatch(
        changeTeamCategory({ teamId: team.id, category })
      ).unwrap();
      toast.success("Category changed successfully");
      close();
    } catch (err) {
      toast.error("Failed to change category");
    }
  };

  if (categoryChangeError) {
    toast.error("Failed to change category");
  }

  return (
    <>
      <div
        onClick={close}
        className="fixed inset-0 z-40 bg-black opacity-50"
      ></div>
      <div className="w-full sm:w-96 h-1/2 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white drop-shadow-2xl border-primary border-s flex flex-col">
        <div className="flex flex-row items-center justify-between border-b-2 p-4 pb-2">
          <h1 className="text-xl font-bold text-gray-800">{team?.teamName}</h1>
          <button onClick={close} className="hover:bg-gray-100 rounded-md p-1">
            <Icons.CloseSidebarIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>
        <div className="flex flex-row gap-2 px-5 py-3 text-xs">
          <p>Category Name:</p>
          <p className="font-semibold">{team?.teamCategory}</p>
        </div>

        <div className="px-4 grow flex flex-col justify-between my-5">
          <SelectField
            state={selectedCategory}
            handleChange={handleChange}
            options={categories}
          />
          {isUpdated && (
            <button
              onClick={handleCategoryChange}
              disabled={loadingCategoryChange}
              className="bg-primary w-full text-white px-5 py-2 text-sm rounded-full hover:bg-opacity-80 flex flex-row justify-center items-center"
            >
              {loadingCategoryChange ? <Spinner /> : "Update Category"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryEditPopup;
