import { createSlice } from "@reduxjs/toolkit";
import { getReports } from "./reportThunk";

const ReportSlice = createSlice({
  name: "reports",
  initialState: {
    gettingReports: false,
    reports: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getReports.pending, (state) => {
      state.gettingReports = true;
    });

    builder.addCase(getReports.fulfilled, (state, action) => {
      state.reports = action.payload;
      state.gettingReports = false;
    });
  },
});

export default ReportSlice.reducer;
