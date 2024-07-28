import {
  doc,
  collection,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { formatDate } from "./functions";

export const addWorkoutToDB = async (data) => {
  const docRef = doc(collection(db, "Work_outs"));
  const validData = {
    wod: data.id,
    startDate: data.startDate,
    endDate: data.endDate,
    exercises: data.exercises,
    status: data.status,
    isActive: true,
    docId: docRef.id,
    description: data.description,
    createdAt: new Date().toISOString(),
  };
  await setDoc(docRef, validData);
  return validData;
};

export const getWorkoutsFromDB = async () => {
  const querySnapshot = await getDocs(
    query(collection(db, "Work_outs"), where("isActive", "==", true))
  );
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
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
    startDate: data.startDate,
    endDate: data.endDate,
    exercises: data.exercises,
    status: data.status,
    isActive: true,
    docId: data.docId,
    description: data.description,
    createdAt: new Date().toISOString(),
  };
  await setDoc(docRef, validData);
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
