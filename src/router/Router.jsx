import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../Layouts/MainLayout";
import { Login } from "../pages/Auth/Login";
import Workouts from "../pages/Workouts";
import UserWorkouts from "../pages/UserWorkouts";
import Users from "../pages/Users";
import WorkoutVideos from "../pages/WorkoutVideos";
import PublicRoute from "../components/PublicRoute";
import PrivateRoute from "../components/PrivateRoute";
import {
  userLoader,
  userWorkoutsLoader,
  workoutLoader,
} from "../redux/loaders";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "workouts",
        element: <Workouts />,
        loader: workoutLoader,
      },
      {
        path: "users",
        element: <Users />,
        loader: userLoader,
      },
      {
        path: "/users/:userId/wods",
        element: <UserWorkouts />,
        loader: userWorkoutsLoader,
      },
      {
        path: "/users/:userId/:workoutId/videos",
        element: <WorkoutVideos />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
