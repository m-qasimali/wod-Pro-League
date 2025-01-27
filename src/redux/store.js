import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import workoutReducer from "./workoutSlice";
import userReducer from "./userSlice";
import videoReducer from "./videoSlice";
import teamReducer from "./teamSlice";
import adminsReducer from "./adminsSlice";
import userCouponReducer from "./couponSlice";
import dashboardSliceReducer from "./dashboardSlice";
import approvalsSliceReducer from "./approvalSlice";
import ResultSliceReducer from "./features/result/ResultSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    workout: workoutReducer,
    user: userReducer,
    video: videoReducer,
    team: teamReducer,
    admins: adminsReducer,
    couponUsers: userCouponReducer,
    dashboard: dashboardSliceReducer,
    approvals: approvalsSliceReducer,
    results: ResultSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
