import {
  doc,
  collection,
  setDoc,
  getDocs,
  query,
  where,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { formatDate } from "./functions";

export const addWorkoutToDB = async (data) => {
  const docRef = doc(collection(db, "Work_outs"));
  const validData = {
    wod: data.id,
    startDate: new Date(data.startDate).toISOString(),
    endDate: new Date(data.endDate).toISOString(),
    wodNumber: `WOD${data.wodNumber}`,
    exercises: data.exercises,
    status: data.status,
    isActive: true,
    resultType: data.resultType,
    maxDuration: `${data.maxDuration}`,
    docId: docRef.id,
    description: data.description,
    createdAt: new Date().toISOString(),
  };
  await setDoc(docRef, validData);
  validData.startDate = validData.startDate.split("T")[0];
  validData.endDate = validData.endDate.split("T")[0];
  validData.wodNumber = +data.wodNumber;
  return validData;
};

export const getWorkoutsFromDB = async () => {
  const querySnapshot = await getDocs(
    query(collection(db, "Work_outs"), orderBy("createdAt", "desc"))
  );

  const data = [];
  querySnapshot.forEach((doc) => {
    const workout = doc.data();

    if (workout.isActive === true) {
      const startDate = new Date(workout.startDate);
      const endDate = new Date(workout.endDate);
      const wodNumber = +workout.wodNumber.split("WOD")[1];
      const maxDuration = +workout.maxDuration;

      workout.startDate = startDate.toISOString().split("T")[0];
      workout.endDate = endDate.toISOString().split("T")[0];
      workout.wodNumber = wodNumber;
      workout.maxDuration = maxDuration;
      data.push(workout);
    }
  });
  return data;
};

export const deleteWorkoutFromDB = async (docId) => {
  const docRef = doc(db, "Work_outs", docId);
  await setDoc(docRef, { isActive: false }, { merge: true });
  return docId;
};

export const updateWorkoutInDB = async (data) => {
  const docRef = doc(db, "Work_outs", data.docId);
  const validData = {
    wod: data.id,
    startDate: new Date(data.startDate).toISOString(),
    endDate: new Date(data.endDate).toISOString(),
    exercises: data.exercises,
    status: data.status,
    isActive: true,
    resultType: data.resultType,
    maxDuration: `${data.maxDuration}`,
    docId: data.docId,
    description: data.description,
    createdAt: new Date().toISOString(),
    wodNumber: `WOD${data.wodNumber}`,
  };
  await setDoc(docRef, validData);
  validData.startDate = validData.startDate.split("T")[0];
  validData.endDate = validData.endDate.split("T")[0];
  validData.wodNumber = +data.wodNumber;
  return validData;
};

export const getUsersFromDB = async () => {
  const rankingDocsRef = await getDocs(collection(db, "rankings"));
  let data1 = [];
  for (const docSnapshot of rankingDocsRef.docs) {
    const res = docSnapshot.data();
    data1.push([...Object.keys(res)]);
  }
  data1 = data1.flat();

  const querySnapshot = await getDocs(collection(db, "test_users"));
  const data = [];

  querySnapshot.forEach((doc) => {
    const res = doc.data();
    if (data1.includes(doc.id)) {
      data.push({
        id: doc.id,
        profileImage: res.profilePicture,
        email: res.email,
        name: res.firstName + " " + res.lastName,
        teamName: res.teamName,
        weight: res.weight,
        token: res?.FCMToken,
      });
    }
  });
  return data;
};

export const getTeamsFromDB = async () => {
  const querySnapshot = await getDocs(collection(db, "test_Teams"));
  const data = [];

  for (const docSnapshot of querySnapshot.docs) {
    const res = docSnapshot.data();

    // Create a document reference and get the document
    const teamsOwnerDocRef = doc(db, "test_users", res.teamCreatorId);
    const teamsOwnerSnapShot = await getDoc(teamsOwnerDocRef);
    const teamOwnerData = teamsOwnerSnapShot.exists()
      ? teamsOwnerSnapShot.data()
      : null;

    data.push({
      id: res.teamId,
      teamName: res.teamName,
      teamCategory: res.teamCategory,
      teamOwner: teamOwnerData?.firstName + teamOwnerData?.lastName,
      teamOwnerEmail: teamOwnerData?.email,
    });
  }

  return data;
};

export const getTeamMembersFromDB = async (teamId) => {
  const querySnapshot = await getDocs(
    query(collection(db, "test_users"), where("teamId", "==", teamId))
  );
  const data = [];
  querySnapshot.forEach((doc) => {
    const res = doc.data();
    data.push({
      id: doc.id,
      profileImage: res.profilePicture,
      email: res.email,
      name: res.firstName + " " + res.lastName,
      teamName: res.teamName,
    });
  });
  return data;
};

export const updateUserWeightInDB = async ({ userId, weight }) => {
  const docRef = doc(db, "test_users", userId);
  await setDoc(docRef, { weight }, { merge: true });
  return { userId, weight };
};

export const getActiveWorkoutsFromDB = async () => {
  const docsRef = await getDocs(collection(db, "rankings"));
  const data = {};

  for (const docSnapshot of docsRef.docs) {
    const res = docSnapshot.data();
    const workoutDocRef = doc(db, "Work_outs", docSnapshot.id);
    const workoutSnapshot = await getDoc(workoutDocRef);
    const workout = workoutSnapshot.data();
    data[docSnapshot.id] = {
      workoutNumber: workout.wodNumber,
      users: [],
    };

    if (workoutSnapshot.exists()) {
      for (const user in res) {
        if (res[user]?.docId) {
          data[docSnapshot.id].users.push(res[user].docId);
        }
      }
    } else {
      throw new Error(`Workout with id ${docSnapshot.id} does not exist`);
    }
  }

  return data;
};

export const updateVideoStatusInDB = async (
  videoId,
  userId,
  workoutId,
  status,
  judgeName,
  videoMinutes,
  videoSeconds,
  repetitions,
  liftedWeight
) => {
  const docRef = doc(db, "Videos", videoId);

  await setDoc(
    docRef,
    {
      status,
      judgeName,
    },
    { merge: true }
  );

  const rankingDocRef = doc(db, "rankings", workoutId);
  const res = await getDoc(rankingDocRef);

  if (res.exists()) {
    const ranking = res.data();
    const user = ranking[userId];
    if (videoMinutes !== 0 || videoSeconds !== 0) {
      user.uploadTime = `${videoMinutes} min ${videoSeconds} sec`;
    }
    if (liftedWeight !== 0) {
      user.liftedWeight = `${liftedWeight}`;
    }
    if (repetitions !== 0) {
      user.repetitions = `${repetitions}`;
    }
    await setDoc(rankingDocRef, { [userId]: user }, { merge: true });
  }

  return { videoId, userId, status };
};

export const getRankingDataFromDB = async ({ userId, workoutId }) => {
  const rankingDocRef = doc(db, "rankings", workoutId);
  const res = await getDoc(rankingDocRef);

  if (res.exists()) {
    const ranking = res.data();
    const user = ranking[userId];
    const data = {
      liftedWeight: user.liftedWeight,
      repetitions: user.repetitions,
      uploadTime: user.uploadTime,
    };

    return data;
  }
  return null;
};

export const getWorkoutVideosFromDB = async (userId) => {
  const rankingsCollection = collection(db, "rankings");
  const rankingsSnapshot = await getDocs(rankingsCollection);

  const workoutIds = rankingsSnapshot.docs.map((doc) => doc.id);

  const data = [];

  for (const workoutId of workoutIds) {
    const rankingDocRef = doc(db, "rankings", workoutId);
    const rankingSnapshot = await getDoc(rankingDocRef);
    const ranking = rankingSnapshot.data();

    if (ranking && ranking[userId]) {
      const videoQuery = query(
        collection(db, "Videos"),
        where("userId", "==", userId),
        where("wodId", "==", workoutId)
      );

      const videoSnapshot = await getDocs(videoQuery);

      // Check if there are any documents in the videoSnapshot
      if (!videoSnapshot.empty) {
        const videoDoc = videoSnapshot.docs[0]; // Get the first document
        const video = videoDoc.data();

        const workoutRef = await getDoc(doc(db, "Work_outs", workoutId));
        const workout = workoutRef.data();

        data.push({
          id: videoDoc.id, // Document ID
          status: video.status,
          userId: video.userId,
          videos: video.videos,
          workoutId: video.wodId,
          uploadTime: formatDate(video.uploadTime),
          workout: {
            wodNumber: workout.wodNumber,
            startDate: formatDate(workout.startDate),
            endDate: formatDate(workout.endDate),
            exercises: workout.exercises,
            maxDuration: `${workout.maxDuration}`,
            description: workout.description,
          },
        });
      }
    }
  }

  return data;
};
