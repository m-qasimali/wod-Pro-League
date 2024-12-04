import { createSlice } from "@reduxjs/toolkit";
import {
  subscribeToWorkoutTeamsThunk,
  subscribeToWorkoutUsersThunk,
} from "./ResultThunk";

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
    updateWorkoutUsers: (state, action) => {
      state.workoutUsers[action.payload.id] = action.payload.data;
    },
    updateWorkoutTeams: (state, action) => {
      state.workoutTeams[action.payload.id] = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(subscribeToWorkoutUsersThunk.fulfilled, (state, action) => {
      state.workoutUsers[action.payload.id] = action.payload.data;
    });

    builder.addCase(subscribeToWorkoutTeamsThunk.fulfilled, (state, action) => {
      state.workoutTeams[action.payload.id] = action.payload.data;
    });
  },
});

export const {
  setSearchQuery,
  setFilters,
  updateWorkoutUsers,
  updateWorkoutTeams,
} = ResultSlice.actions;

export default ResultSlice.reducer;
