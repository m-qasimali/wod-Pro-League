import { createSlice } from "@reduxjs/toolkit";
import { getWorkoutTeams, getWorkoutUsers } from "./ResultThunk";

const ResultSlice = createSlice({
  name: "results",
  initialState: {
    workoutUsers: {},
    workoutTeams: {},
    searchQuery: "",
    filters: {
      category: "",
      status: "",
    },
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWorkoutUsers.fulfilled, (state, action) => {
      state.workoutUsers[action.payload.id] = action.payload.data;
    });

    builder.addCase(getWorkoutTeams.fulfilled, (state, action) => {
      state.workoutTeams[action.payload.id] = action.payload.data;
    });
  },
});

export const { setSearchQuery, setFilters } = ResultSlice.actions;

export default ResultSlice.reducer;
