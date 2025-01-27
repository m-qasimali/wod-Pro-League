import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addWorkoutToDB,
  deleteWorkoutFromDB,
  getActiveWorkoutsFromDB,
  getWorkoutsFromDB,
  getWorkoutVideosFromDB,
  updateWorkoutInDB,
} from "../utils/DBFunctions";

export const addWorkout = createAsyncThunk(
  "workout/addWorkout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addWorkoutToDB(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getWorkouts = createAsyncThunk(
  "workout/getWorkouts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWorkoutsFromDB();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWorkout = createAsyncThunk(
  "workout/deleteWorkout",
  async (docId, { rejectWithValue }) => {
    try {
      await deleteWorkoutFromDB(docId);
      return docId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateWorkout = createAsyncThunk(
  "workout/updateWorkout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateWorkoutInDB(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getActiveWorkouts = createAsyncThunk(
  "workout/getActiveWorkouts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getActiveWorkoutsFromDB();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserWorkouts = createAsyncThunk(
  "workout/getUserWorkouts",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getWorkoutVideosFromDB(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workouts: [],
    loading: false,
    error: null,
    activeWorkouts: [],
    loadingActiveWorkouts: false,
    activeWorkoutsError: null,
    userWorkouts: [],
    gettingUserWorkouts: false,
    userWorkoutsError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(addWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts.push(action.payload);
      })
      .addCase(addWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getWorkouts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkouts.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = action.payload;
      })
      .addCase(getWorkouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = state.workouts.filter(
          (workout) => workout.docId !== action.payload
        );
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = state.workouts.map((workout) =>
          workout.docId === action.payload.docId ? action.payload : workout
        );
      })
      .addCase(updateWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getActiveWorkouts.pending, (state) => {
        state.loadingActiveWorkouts = true;
      })
      .addCase(getActiveWorkouts.fulfilled, (state, action) => {
        state.loadingActiveWorkouts = false;
        state.activeWorkouts = action.payload;
      })
      .addCase(getActiveWorkouts.rejected, (state, action) => {
        state.loadingActiveWorkouts = false;
        state.activeWorkoutsError = action.payload;
      })
      .addCase(getUserWorkouts.pending, (state) => {
        state.gettingUserWorkouts = true;
      })
      .addCase(getUserWorkouts.fulfilled, (state, action) => {
        state.gettingUserWorkouts = false;
        state.userWorkouts = action.payload;
      })
      .addCase(getUserWorkouts.rejected, (state, action) => {
        state.gettingUserWorkouts = false;
        state.userWorkoutsError = action.payload;
      });
  },
});

export default workoutSlice.reducer;
