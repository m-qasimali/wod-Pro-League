import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../Layouts/MainLayout";
import { Login } from "../pages/Auth/Login";
import Workouts from "../pages/Workouts";
import UserWorkouts from "../pages/UserWorkouts";
import Users from "../pages/Users";
import WorkoutVideos from "../pages/WorkoutVideos";
import PublicRoute from "../components/PublicRoute";
import PrivateRoute from "../components/PrivateRoute";

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
        path: "workouts", // This should not start with a slash
        element: <Workouts />,
      },
      {
        path: "users", // This should not start with a slash
        element: <Users />,
      },
      {
        path: "/users/:userId/workouts",
        element: <UserWorkouts />,
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
