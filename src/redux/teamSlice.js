import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTeamMembersFromDB, getTeamsFromDB } from "../utils/DBFunctions";

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

export const getTeamMembers = createAsyncThunk(
  "teams/getTeamMembers",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await getTeamMembersFromDB(teamId);
      return {
        id: teamId,
        members: response,
      };
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
    loadingMembers: false,
    teamMembers: {},
    teamMembersError: null,
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
    builder.addCase(getTeamMembers.pending, (state) => {
      state.loadingMembers = true;
      state.teamMembersError = null;
    });
    builder.addCase(getTeamMembers.fulfilled, (state, action) => {
      state.loadingMembers = false;
      state.teamMembers[action.payload.id] = action.payload.members;
    });
    builder.addCase(getTeamMembers.rejected, (state, action) => {
      state.loadingMembers = false;
      state.teamMembersError = action.payload;
    });
  },
});

export const { setTeamSearchQuery } = teamSlice.actions;

export default teamSlice.reducer;
