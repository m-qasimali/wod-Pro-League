import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";

export const getReportsFromDB = async () => {
  const [reportsSnap] = await Promise.all([getDocs(collection(db, "report"))]);

  const reports = reportsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return reports;
};
