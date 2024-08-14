import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addNewAdminToDB,
  deleteAdminFromDB,
  getAdminsFromDB,
} from "../utils/DBFunctions";

export const addNewAdmin = createAsyncThunk(
  "admins/addNewAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addNewAdminToDB(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAdmins = createAsyncThunk(
  "admins/getAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAdminsFromDB();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  "admins/deleteAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteAdminFromDB(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const AdminsSlice = createSlice({
  name: "admins",
  initialState: {
    searchQuery: "",
    admins: [],
    loadingAdmins: false,
    loadingAdminsError: null,
    addingNewAdmin: false,
    addingNewAdminError: null,
    deletingAdmin: false,
    deletingAdminError: null,
  },
  reducers: {
    setAdminSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewAdmin.pending, (state) => {
      state.addingNewAdmin = true;
      state.addingNewAdminError = null;
    });
    builder.addCase(addNewAdmin.fulfilled, (state, action) => {
      state.addingNewAdmin = false;
      state.admins.push(action.payload);
    });
    builder.addCase(addNewAdmin.rejected, (state, action) => {
      state.addingNewAdmin = false;
      state.addingNewAdminError = action.payload
        ? action.payload
        : "Error adding new admin";
    });
    builder.addCase(getAdmins.pending, (state) => {
      state.loadingAdmins = true;
      state.loadingAdminsError = null;
    });
    builder.addCase(getAdmins.fulfilled, (state, action) => {
      state.loadingAdmins = false;
      state.admins = action.payload;
    });
    builder.addCase(getAdmins.rejected, (state, action) => {
      state.loadingAdmins = false;
      state.loadingAdminsError = action.payload
        ? action.payload
        : "Error loading admins";
    });
    builder.addCase(deleteAdmin.pending, (state) => {
      state.deletingAdmin = true;
      state.deletingAdminError = null;
    });
    builder.addCase(deleteAdmin.fulfilled, (state, action) => {
      state.deletingAdmin = false;
      state.admins = state.admins.filter(
        (admin) => admin.id !== action.payload
      );
    });
    builder.addCase(deleteAdmin.rejected, (state, action) => {
      state.deletingAdmin = false;
      state.deletingAdminError = action.payload
        ? action.payload
        : "Error deleting";
    });
  },
});

export const { setAdminSearchQuery } = AdminsSlice.actions;

export default AdminsSlice.reducer;
