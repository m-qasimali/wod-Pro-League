import { FirebaseCollectionNames } from "@/constant/variables";
import { db } from "../../../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getWorkoutUsersFromDB = async (workoutId) => {
  try {
    const rankingRef = doc(db, FirebaseCollectionNames.Rankings, workoutId);
    const rankingSnap = await getDoc(rankingRef);
    const rankingData = rankingSnap.data();

    const videosRef = collection(db, FirebaseCollectionNames.Videos);
    const videosQuery = query(videosRef, where("wodId", "==", workoutId));
    const videosSnap = await getDocs(videosQuery);
    const videosData = {};
    videosSnap.docs.map((doc) => {
      const video = doc.data();
      videosData[video.userId] = video;
    });

    const participatedUsers = [];

    for (const [userId, user] of Object.entries(rankingData)) {
      if (user.teamId === "") {
        participatedUsers.push({ ...user, video: videosData[userId] });
      }
    }

    return participatedUsers;
  } catch (error) {
    console.error("Error fetching workout users:", error);
    throw error; // Re-throw the error for handling elsewhere
  }
};

export const getWorkoutTeamsFromDB = async (workoutId) => {
  try {
    const rankingRef = doc(db, FirebaseCollectionNames.Rankings, workoutId);
    const rankingSnap = await getDoc(rankingRef);
    const rankingData = rankingSnap.data();

    const videosRef = collection(db, FirebaseCollectionNames.Videos);
    const videosQuery = query(videosRef, where("wodId", "==", workoutId));
    const videosSnap = await getDocs(videosQuery);
    const videosData = {};
    videosSnap.docs.map((doc) => {
      const video = doc.data();
      videosData[video.userId] = video;
    });

    const participatedTeams = [];

    for (const [userId, user] of Object.entries(rankingData)) {
      if (user.teamId !== "") {
        participatedTeams.push({ ...user, video: videosData[userId] });
      }
    }

    return participatedTeams;
  } catch (error) {
    console.error("Error fetching workout teams:", error);
    throw error; // Re-throw the error for handling elsewhere
  }
};
