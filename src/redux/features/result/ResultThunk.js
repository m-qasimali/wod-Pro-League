import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWorkoutTeamsFromDB, getWorkoutUsersFromDB } from "./ResultDB";

export const getWorkoutUsers = createAsyncThunk(
  "results/getWorkoutUsers",
  async (workoutId, { rejectWithValue }) => {
    try {
      const response = await getWorkoutUsersFromDB(workoutId);
      console.log("response: ", response);

      return {
        id: workoutId,
        data: response,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getWorkoutTeams = createAsyncThunk(
  "results/getWorkoutTeams",
  async (workoutId, { rejectWithValue }) => {
    try {
      const response = await getWorkoutTeamsFromDB(workoutId);
      return {
        id: workoutId,
        data: response,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
