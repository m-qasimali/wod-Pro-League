import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCouponUsersFromDB,
  getFreeCouponUsersFromDB,
} from "../utils/DBFunctions";

export const getCouponUsers = createAsyncThunk(
  "userCoupons/getCouponUsers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getCouponUsersFromDB(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getFreeCouponsUsers = createAsyncThunk(
  "userCoupons/getFreeCouponsUsers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getFreeCouponUsersFromDB(data);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userCouponSlice = createSlice({
  name: "userCoupons",
  initialState: {
    discountUsers: {},
    freeUsers: {},
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(getCouponUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCouponUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.discountUsers[action.payload.couponName] = action.payload.users;
    });
    builder.addCase(getCouponUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getFreeCouponsUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFreeCouponsUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.freeUsers[action.payload.couponName] = action.payload.users;
    });
    builder.addCase(getFreeCouponsUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userCouponSlice.reducer;
