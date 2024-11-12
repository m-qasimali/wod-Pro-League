import {
  approveRequestStatusInDB,
  getApprovalsRequestFromDB,
} from "@/utils/DBFunctions3";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getApprovals = createAsyncThunk(
  "admins/addNewAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getApprovalsRequestFromDB();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const approveRequest = createAsyncThunk(
  "admins/approveRequest",
  async (id, { rejectWithValue }) => {
    try {
      const response = await approveRequestStatusInDB(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ApprovalsSlice = createSlice({
  name: "approvals",
  initialState: {
    gettingApprovals: false,
    approvals: [],
    approvingRequest: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApprovals.pending, (state) => {
      state.gettingApprovals = true;
    });
    builder.addCase(getApprovals.fulfilled, (state, action) => {
      state.gettingApprovals = false;
      state.approvals = action.payload;
    });

    builder.addCase(approveRequest.pending, (state) => {
      state.approvingRequest = true;
    });
    builder.addCase(approveRequest.fulfilled, (state, action) => {
      state.approvingRequest = false;
      state.approvals = state.approvals.filter(
        (approval) => approval.id !== action.payload
      );
    });
  },
});

export default ApprovalsSlice.reducer;
