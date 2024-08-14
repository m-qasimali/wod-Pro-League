import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import workoutReducer from "./workoutSlice";
import userReducer from "./userSlice";
import videoReducer from "./videoSlice";
import teamReducer from "./teamSlice";
import adminsReducer from "./adminsSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    workout: workoutReducer,
    user: userReducer,
    video: videoReducer,
    team: teamReducer,
    admins: adminsReducer,
  },
});
