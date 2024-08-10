import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersFromDB, updateUserWeightInDB } from "../utils/DBFunctions";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsersFromDB();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserWeight = createAsyncThunk(
  "users/updateUserWeight",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateUserWeightInDB(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchQuery: "",
    filters: {
      weightSize: "=",
      weight: "",
      workout: "",
    },
    updatingUserWeight: false,
    selectedUsers: [],
  },
  reducers: {
    setUserSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setUserFilters: (state, action) => {
      state.filters = action.payload;
    },
    setSelectedUsers: (state, action) => {
      state.selectedUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateUserWeight.pending, (state) => {
      state.updatingUserWeight = true;
    });
    builder.addCase(updateUserWeight.fulfilled, (state, action) => {
      state.updatingUserWeight = false;
      state.users = state.users.map((user) =>
        user.id === action.payload?.userId
          ? { ...user, weight: action.payload?.weight }
          : user
      );
    });
    builder.addCase(updateUserWeight.rejected, (state) => {
      state.updatingUserWeight = false;
    });
  },
});

export const { setUserSearchQuery, setUserFilters, setSelectedUsers } =
  userSlice.actions;

export default userSlice.reducer;
