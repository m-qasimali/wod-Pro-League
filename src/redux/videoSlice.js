import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRankingDataFromDB,
  updateVideoStatusInDB,
} from "../utils/DBFunctions";

export const getRankingData = createAsyncThunk(
  "ranking/data",
  async ({ userId, workoutId }, { rejectWithValue }) => {
    try {
      const response = await getRankingDataFromDB({ userId, workoutId });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const upateVideoStatus = createAsyncThunk(
  "video/updateStatus",
  async (
    {
      videoId,
      userId,
      workoutId,
      status,
      judgeName,
      videoMinutes,
      videoSeconds,
      repetitions,
      liftedWeight,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateVideoStatusInDB(
        videoId,
        userId,
        workoutId,
        status,
        judgeName,
        videoMinutes,
        videoSeconds,
        repetitions,
        liftedWeight
      );
      return response;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.message);
    }
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    loadingRanking: false,
    loadingRankingsError: null,
    rankingData: {},
  },

  extraReducers: (builder) => {
    builder.addCase(upateVideoStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(upateVideoStatus.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(upateVideoStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getRankingData.pending, (state) => {
      state.loadingRanking = true;
      state.loadingRankingsError = null;
    });
    builder.addCase(getRankingData.fulfilled, (state, action) => {
      state.loadingRanking = false;
      state.rankingData = action.payload;
    });
    builder.addCase(getRankingData.rejected, (state, action) => {
      state.loadingRanking = false;
      state.loadingRankingsError = action.payload
        ? action.payload
        : "Error fetching ranking data";
    });
  },
});

export default videoSlice.reducer;
