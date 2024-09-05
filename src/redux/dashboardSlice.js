import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardStatsFromDB } from "../utils/DBFunctions2";

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getDashboardStatsFromDB();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    totalUsers: 0,
    totalTeams: 0,
    singlePersonTeams: 0,
    twoPersonTeams: 0,
    fourPersonTeams: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.totalUsers = action.payload.totalUsers;
        state.totalTeams = action.payload.totalTeams;
        state.singlePersonTeams = action.payload.singlePersonTeams;
        state.twoPersonTeams = action.payload.twoPersonTeams;
        state.fourPersonTeams = action.payload.fourPersonTeams;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
