import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

export const getDashboardStatsFromDB = async () => {
  const usersRef = query(
    collection(db, "users"),
    where("isActive", "==", true)
  );
  const teamsRef = collection(db, "teams");

  const [usersSnapshot, teamsSnapshot] = await Promise.all([
    getDocs(usersRef),
    getDocs(teamsRef),
  ]);

  const totalUsers = usersSnapshot.size;
  const totalTeams = teamsSnapshot.size;

  return {
    totalUsers,
    totalTeams,
  };
};
