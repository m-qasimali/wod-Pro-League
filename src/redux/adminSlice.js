import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInAdminInDB } from "../utils/DBFunctions";

export const signInAdmin = createAsyncThunk(
  "admin/signInAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await signInAdminInDB(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: {},
    loadingAdmin: false,
    loadingAdminError: null,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    clearAdmin: (state) => {
      state.admin = {};
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signInAdmin.pending, (state) => {
      state.loadingAdmin = true;
      state.loadingAdminError = null;
    });
    builder.addCase(signInAdmin.fulfilled, (state, action) => {
      state.admin = action.payload;
      state.loadingAdmin = false;
    });
    builder.addCase(signInAdmin.rejected, (state, action) => {
      state.loadingAdmin = false;
      state.loadingAdminError = action.payload;
    });
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
