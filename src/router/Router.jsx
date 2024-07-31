import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../Layouts/MainLayout";
import PublicRoute from "../components/PublicRoute";
import PrivateRoute from "../components/PrivateRoute";
import {
  teamLoader,
  userLoader,
  userWorkoutsLoader,
  workoutLoader,
} from "../redux/loaders";
import { lazy, Suspense } from "react";
import Loader from "../components/global/Loader";

// Lazy load your components
const Login = lazy(() => import("../pages/Auth/Login"));
const Workouts = lazy(() => import("../pages/Workouts"));
const Teams = lazy(() => import("../pages/Teams"));
const Users = lazy(() => import("../pages/Users"));
const UserWorkouts = lazy(() => import("../pages/UserWorkouts"));
const WorkoutVideos = lazy(() => import("../pages/WorkoutVideos"));

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
            {" "}
            <Teams />{" "}
          </Suspense>
        ),
        loader: teamLoader,
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<Loader />}>
            {" "}
            <Users />{" "}
          </Suspense>
        ),
        loader: userLoader,
      },
      {
        path: "/users/:userId/wods",
        element: (
          <Suspense fallback={<Loader />}>
            {" "}
            <UserWorkouts />{" "}
          </Suspense>
        ),
        loader: userWorkoutsLoader,
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
