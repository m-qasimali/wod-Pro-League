import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../Layouts/MainLayout";
import PublicRoute from "../components/PublicRoute";
import PrivateRoute from "../components/PrivateRoute";
import { workoutLoader } from "../redux/loaders";
import { Suspense } from "react";
import Loader from "../components/global/Loader";
import { Login } from "../pages/Auth/Login";
import Workouts from "../pages/Workouts";
import Teams from "../pages/Teams";
import Users from "../pages/Users";
import UserWorkouts from "../pages/UserWorkouts";
import WorkoutVideos from "../pages/WorkoutVideos";

// Lazy load your components

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
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
        element: (
          <Suspense fallback={<Loader />}>
            <Workouts />
          </Suspense>
        ),
        loader: workoutLoader,
      },
      {
        path: "teams",
        element: (
          <Suspense fallback={<Loader />}>
            <Teams />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<Loader />}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: "/users/:userId/wods",
        element: (
          <Suspense fallback={<Loader />}>
            {" "}
            <UserWorkouts />{" "}
          </Suspense>
        ),
      },
      {
        path: "/users/:userId/:workoutId/videos",
        element: (
          <Suspense fallback={<Loader />}>
            {" "}
            <WorkoutVideos />{" "}
          </Suspense>
        ),
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
