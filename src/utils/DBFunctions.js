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
    maxDuration: data.maxDuration,
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
    maxDuration: data.maxDuration,
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
  const querySnapshot = await getDocs(collection(db, "test_users"));
  const data = [];
  querySnapshot.forEach((doc) => {
    const res = doc.data();
    data.push({
      id: doc.id,
      profileImage: res.profilePicture,
      email: res.email,
      name: res.firstName + " " + res.lastName,
      teamName: res.teamName,
      weight: res.weight,
    });
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

export const userWorkOutsVideosFromDB = async (userId) => {
  const q = query(
    collection(db, "Videos"),
    where("userId", "==", userId.trim())
  );
  const querySnapshot = await getDocs(q);

  const data = [];
  querySnapshot.forEach((doc) => {
    let res = doc.data();
    data.push({
      id: doc.id,
      athleteTime: res.athleteTime,
      userId: res.userId,
      videos: res.videos,
      workoutId: res.wodId,
      uploadTime: formatDate(res.uploadTime),
      status: res.status,
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
  const docsRef = await getDocs(collection(db, "ranking"));
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
  videoSeconds
) => {
  const docRef = doc(db, "Videos", videoId);

  if (videoMinutes === 0 && videoSeconds === 0) {
    await setDoc(docRef, { status, judgeName }, { merge: true });
  } else {
    const athleteTime = `${videoMinutes} min ${videoSeconds} sec`;

    await setDoc(
      docRef,
      {
        status,
        judgeName,
        athleteTime,
      },
      { merge: true }
    );

    const rankingDocRef = doc(db, "ranking", workoutId);
    const res = await getDoc(rankingDocRef);

    if (res.exists()) {
      const ranking = res.data();
      const user = ranking[userId];
      user.uploadTime = `${videoMinutes} min ${videoSeconds} sec`;
      await setDoc(rankingDocRef, { [userId]: user }, { merge: true });
    }
  }

  return { videoId, userId, status };
};
