import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";

export const getBoxesFromDB = async () => {
  const boxesRef = doc(db, "boxes", "boxes");
  const boxesSnap = await getDoc(boxesRef);
  const boxes = boxesSnap.data().boxes;
  return boxes;
};

export const updateUserInDB = async (data) => {
  const userRef = doc(db, "users", data.id);
  setDoc(userRef, { ...data, updatedAt: Timestamp.now() }, { merge: true });
  return data;
};
