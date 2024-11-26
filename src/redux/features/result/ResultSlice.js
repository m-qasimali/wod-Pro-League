import { createSlice } from "@reduxjs/toolkit";
import { getWorkoutTeams, getWorkoutUsers } from "./ResultThunk";

const ResultSlice = createSlice({
  name: "results",
  initialState: {
    workoutUsers: {},
    workoutTeams: {},
  },
  reducers: {
    // setAdminSearchQuery: (state, action) => {
    //   state.searchQuery = action.payload;
    // },
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

export default ResultSlice.reducer;
