import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  updateVideoStatusInDB,
  userWorkOutsVideosFromDB,
} from "../utils/DBFunctions";

export const getUserVideos = createAsyncThunk(
  "user/videos",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userWorkOutsVideosFromDB(userId);
      return {
        userId,
        videos: response,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const upateVideoStatus = createAsyncThunk(
  "video/updateStatus",
  async (
    { videoId, userId, status, judgeName, videoMinutes, videoSeconds },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateVideoStatusInDB(
        videoId,
        userId,
        status,
        judgeName,
        videoMinutes,
        videoSeconds
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: {},
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(getUserVideos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = {
        ...state.videos,
        [action.payload.userId]: action.payload.videos,
      };
    });
    builder.addCase(getUserVideos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(upateVideoStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(upateVideoStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = {
        ...state.videos,
        [action.payload.userId]: state.videos[action.payload.userId].map(
          (video) =>
            video.id === action.payload.videoId
              ? { ...video, status: action.payload.status }
              : video
        ),
      };
    });
    builder.addCase(upateVideoStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default videoSlice.reducer;
