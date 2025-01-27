// loaders.js
import { store } from "./store";
import { getTeams } from "./teamSlice";
import { getUsers } from "./userSlice";
import { getWorkouts } from "./workoutSlice";

export const workoutLoader = async () => {
  await store.dispatch(getWorkouts());
  return null;
};

export const userLoader = async () => {
  await store.dispatch(getUsers());
  return null;
};

export const teamLoader = async () => {
  await store.dispatch(getTeams());
  return null;
};