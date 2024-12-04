import { FirebaseCollectionNames } from "@/constant/variables";
import { db } from "../../../../firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export const subscribeToWorkoutUsers = (workoutId, callback) => {
  try {
    const rankingRef = doc(db, FirebaseCollectionNames.Rankings, workoutId);
    const videosRef = collection(db, FirebaseCollectionNames.Videos);

    // Listen to changes in rankings
    const rankingUnsub = onSnapshot(rankingRef, async (rankingSnap) => {
      const rankingData = rankingSnap.data();

      // Listen to changes in videos
      const videosQuery = query(videosRef, where("wodId", "==", workoutId));
      const videosUnsub = onSnapshot(videosQuery, (videosSnap) => {
        const videosData = {};
        videosSnap.docs.forEach((doc) => {
          const video = doc.data();
          videosData[video.userId] = video;
        });

        const participatedUsers = [];
        for (const [userId, user] of Object.entries(rankingData)) {
          if (user.teamId === "") {
            participatedUsers.push({ ...user, video: videosData[userId] });
          }
        }

        // Pass the data to the callback
        callback(participatedUsers);
      });

      // Return cleanup function for videos listener
      return videosUnsub;
    });

    // Return cleanup function for rankings listener
    return () => {
      rankingUnsub();
    };
  } catch (error) {
    console.error("Error setting up listeners for workout users:", error);
    throw error;
  }
};

export const subscribeToWorkoutTeams = (workoutId, callback) => {
  try {
    const rankingRef = doc(db, FirebaseCollectionNames.Rankings, workoutId);
    const videosRef = collection(db, FirebaseCollectionNames.Videos);
    const videosQuery = query(videosRef, where("wodId", "==", workoutId));

    // Set up real-time listener for rankings
    const unsubscribe = onSnapshot(rankingRef, async (rankingSnap) => {
      const rankingData = rankingSnap.data();

      const videosSnap = await getDocs(videosQuery);
      const videosData = {};
      videosSnap.docs.forEach((doc) => {
        const video = doc.data();
        videosData[video.userId] = video;
      });

      const tempParticipatedTeams = {};
      const participatedTeams = [];

      for (const [userId, user] of Object.entries(rankingData)) {
        if (user.teamId !== "") {
          if (!tempParticipatedTeams[user.teamId]) {
            tempParticipatedTeams[user.teamId] = {
              ...user,
              video: videosData[userId],
            };
          } else {
            if (videosData[userId]?.wodId) {
              tempParticipatedTeams[user.teamId] = {
                ...user,
                video: videosData[userId],
              };
            }
          }
        }
      }

      for (const [_, team] of Object.entries(tempParticipatedTeams)) {
        participatedTeams.push(team);
      }

      callback(participatedTeams);
    });

    return unsubscribe; // Return unsubscribe function to clean up listener
  } catch (error) {
    console.error(
      "Error setting up real-time listener for workout teams:",
      error
    );
    throw error;
  }
};
