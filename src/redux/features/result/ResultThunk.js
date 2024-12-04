import { createAsyncThunk } from "@reduxjs/toolkit";
import { subscribeToWorkoutTeams, subscribeToWorkoutUsers } from "./ResultDB";
import { updateWorkoutTeams, updateWorkoutUsers } from "./ResultSlice";

export const subscribeToWorkoutUsersThunk = createAsyncThunk(
  "results/subscribeToWorkoutUsers",
  async (workoutId, { dispatch, rejectWithValue }) => {
    try {
      const unsubscribe = subscribeToWorkoutUsers(workoutId, (data) => {
        dispatch(updateWorkoutUsers({ id: workoutId, data }));
      });

      return unsubscribe; // Return the unsubscribe function for later cleanup
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const subscribeToWorkoutTeamsThunk = createAsyncThunk(
  "results/subscribeToWorkoutTeams",
  async (workoutId, { dispatch, rejectWithValue }) => {
    try {
      const unsubscribe = subscribeToWorkoutTeams(workoutId, (data) => {
        dispatch(updateWorkoutTeams({ id: workoutId, data }));
      });
      return unsubscribe; // Return unsubscribe for cleanup
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
