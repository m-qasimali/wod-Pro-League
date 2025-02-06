import { createAsyncThunk } from "@reduxjs/toolkit";
import { getReportsFromDB } from "./reportDB";

export const getReports = createAsyncThunk(
  "reports/getReports",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching reports...");
      const reports = await getReportsFromDB();
      return reports;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
