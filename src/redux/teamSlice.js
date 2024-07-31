import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTeamsFromDB } from "../utils/DBFunctions";

export const getTeams = createAsyncThunk(
  "teams/getTeams",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTeamsFromDB();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const teamSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [],
    loading: false,
    error: null,
    searchQuery: "",
  },
  reducers: {
    setTeamSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTeams.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTeams.fulfilled, (state, action) => {
      state.loading = false;
      state.teams = action.payload;
    });
    builder.addCase(getTeams.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setTeamSearchQuery } = teamSlice.actions;

export default teamSlice.reducer;
