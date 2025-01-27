import { createAsyncThunk } from "@reduxjs/toolkit";
import { addFeedbackInDB } from "./feedbackDB";

export const addFeedback = createAsyncThunk(
  "feedback/addFeedback",
  async (data, { rejectWithValue }) => {
    try {
      const res = await addFeedbackInDB(data);
      return res; // Return unsubscribe for cleanup
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
