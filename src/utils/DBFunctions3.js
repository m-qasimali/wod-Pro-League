import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
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

export const updateTeamInDB = async (data) => {
  const teamRef = doc(db, "teams", data.id);
  const team = (await getDoc(teamRef)).data();

  const newTeamMembers = data.teammateEmails.filter(
    (email) => !team.teammateEmails.includes(email)
  );
};

export const getApprovalsRequestFromDB = async () => {
  // Parallelize database requests to reduce load time
  const [approvalsRequestSnap, usersSnap, workoutsSnap] = await Promise.all([
    getDocs(
      query(collection(db, "videoRequest"), where("status", "==", "pending"))
    ),
    getDocs(collection(db, "users")),
    getDocs(collection(db, "Work_outs")),
  ]);

  // Map each snapshot to retrieve data in a more structured way
  const approvalsRequest = approvalsRequestSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const usersMap = new Map(
    usersSnap.docs.map((doc) => [doc.id, { id: doc.id, ...doc.data() }])
  );

  const workoutsMap = new Map(
    workoutsSnap.docs.map((doc) => [doc.id, { id: doc.id, ...doc.data() }])
  );

  // Merge data by directly looking up from maps instead of using .find()
  const validData = approvalsRequest.map((request) => ({
    ...request,
    user: usersMap.get(request.userId) || null,
    workout: workoutsMap.get(request.currentWodId) || null,
  }));

  return validData;
};

export const approveRequestStatusInDB = async (id) => {
  const requestRef = doc(db, "videoRequest", id);
  setDoc(requestRef, { status: "approved" }, { merge: true });

  return id;
};
