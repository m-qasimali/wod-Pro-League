import {
  doc,
  collection,
  setDoc,
  getDocs,
  query,
  where,
  getDoc,
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
    query(collection(db, "Work_outs"), where("isActive", "==", true))
  );
  const data = [];
  querySnapshot.forEach((doc) => {
    const workout = doc.data();
    const startDate = new Date(workout.startDate);
    const endDate = new Date(workout.endDate);
    const wodNumber = +workout.wodNumber.split("WOD")[1];

    workout.startDate = startDate.toISOString().split("T")[0];
    workout.endDate = endDate.toISOString().split("T")[0];
    workout.wodNumber = wodNumber;
    data.push(workout);
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
    });
  }

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
      workoutId: res.workoutId,
      uploadTime: formatDate(res.uploadTime),
      status: res.status,
    });
  });

  return data;
};

export const updateVideoStatusInDB = async (videoId, userId, status) => {
  const docRef = doc(db, "Videos", videoId);
  await setDoc(docRef, { status }, { merge: true });
  return { videoId, userId, status };
};
