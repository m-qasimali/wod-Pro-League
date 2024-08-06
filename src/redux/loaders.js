// loaders.js
import { store } from "./store";
import { getTeams } from "./teamSlice";
import { getUsers } from "./userSlice";
import { getUserVideos } from "./videoSlice";
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

export const userWorkoutsLoader = async (params) => {
  const userId = params?.params?.userId;
  let videos = store.getState().video.videos[userId];
  let workouts = store.getState().workout.workouts;
  let userWorkoutVideos = [];

  if (workouts.length === 0) {
    workouts = await (await store.dispatch(getWorkouts())).payload;
  }

  if (!videos) {
    videos = await (await store.dispatch(getUserVideos(userId))).payload.videos;
  }

  videos.map((video) => {
    let temp = { ...video };
    
    temp.workout = workouts.find(
      (workout) => workout.docId === video.workoutId
    );
    userWorkoutVideos.push(temp);
  });

  if (userWorkoutVideos) {
    return {
      userWorkoutVideos,
    };
  }
  return null;
};
