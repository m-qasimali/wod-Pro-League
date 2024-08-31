import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { emailSubject } from "@/constant/variables";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  formatDOB,
  generatePassword,
  splitCategoryNameAndPrice,
} from "./functions";
import { provinces, spain_cities } from "@/constant/provinces";
import { sendMails } from "./DBFunctions";
import { selfEmailTemplate, teamEmailTemplate } from "./EmailTemplates";

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

export const createTeamInDB = async (team) => {
  const password = generatePassword();
  const captainRef = await createUserWithEmailAndPassword(
    auth,
    team.captainEmail,
    password
  );
  const captainId = captainRef.user.uid;

  const teamRef = doc(collection(db, "teams"));
  const teamData = {
    creatorEmail: team.captainEmail,
    platform: "app",
    teamCategory: team.category,
    teamCreatorId: captainId,
    teamId: teamRef.id,
    teamName: team.teamName,
    teammateEmails: team.membersEmails,
    teammateGenders: [team.gender],
  };

  await setDoc(teamRef, teamData);

  const userData = {
    birthDate: formatDOB(team.dob.startDate),
    boxNumber: team.boxNumber,
    categoryName: team.category,
    categoryPrice: splitCategoryNameAndPrice([team.category])[0].price,
    city: spain_cities.find((city) => city.id === team.city).nm,
    country: team.country,
    createdAt: new Date().toISOString(),
    email: team.captainEmail,
    firstName: team.firstName,
    gender: team.gender,
    isActive: true,
    isPaid: team?.isPaid || false,
    lastName: team.lastName,
    phoneNumber: team.phone,
    platform: "app",
    postalCode: team.postalCode,
    province: provinces.find((province) => province.id === team.province).nm,
    street: team.street,
    userId: captainId,
    profilePicture: "",
    updatedAt: new Date().toISOString(),
    number: team.streetNumber,
    teammateEmail: team.membersEmails,
    teamName: team.teamName,
    teamId: teamRef.id,
    teamBanner: "",
    weight: 0,
  };

  const emails = [...team.membersEmails, team.captainEmail];
  await setDoc(doc(db, "users", captainId), userData);
  await sendMails({
    emails,
    subject: emailSubject,
    body: teamEmailTemplate({
      teamCategory: team.category,
      teamName: team.teamName,
      emailList: emails,
      creatorEmail: team.captainEmail,
    }),
  });

  await sendMails({
    emails: [team.captainEmail],
    subject: emailSubject,
    body: selfEmailTemplate({
      category: team.category,
      password: password,
    }),
  });

  return {
    id: teamRef.id,
    teamName: team.teamName,
    teamCategory: team.category,
    teamOwner: team.firstName + " " + team.lastName,
    teamOwnerEamil: team.captainEmail,
    platform: "app",
  };
};

export const createUserInDB = async (team) => {
  const password = generatePassword();
  const userRef = await createUserWithEmailAndPassword(
    auth,
    team.email,
    password
  );
  const userId = userRef.user.uid;

  const userData = {
    birthDate: formatDOB(team.dob.startDate),
    boxNumber: team.boxNumber,
    categoryName: team.category,
    categoryPrice: splitCategoryNameAndPrice([team.category])[0].price,
    city: spain_cities.find((city) => city.id === team.city).nm,
    country: team.country,
    createdAt: new Date().toISOString(),
    email: team.email,
    firstName: team.firstName,
    gender: team.gender,
    isActive: true,
    isPaid: team.isPaid,
    lastName: team.lastName,
    phoneNumber: team.phone,
    platform: "app",
    postalCode: team.postalCode,
    province: provinces.find((province) => province.id === team.province).nm,
    street: team.street,
    userId: userId,
    profilePicture: "",
    updatedAt: new Date().toISOString(),
    number: team.streetNumber,
    weight: 0,
    teammateEmail: [],
    teamName: "",
    teamId: "",
    teamBanner: "",
  };

  await setDoc(doc(db, "users", userId), userData);

  await sendMails({
    emails: [team.email],
    subject: emailSubject,
    body: selfEmailTemplate({
      category: team.category,
      password: password,
    }),
  });

  return {
    id: userId,
    profileImage: "",
    email: team.email,
    name: team.firstName + " " + team.lastName,
    teamName: "",
    weight: 0,
    token: "",
  };
};

export const getTeamDetailsByEmailFromDB = async ({ creatorEmail }) => {
  const teamsRef = query(
    collection(db, "teams"),
    where("creatorEmail", "==", creatorEmail)
  );
  const teamsSnapshot = await getDocs(teamsRef);

  if (teamsSnapshot.empty) {
    return null;
  }

  const team = teamsSnapshot.docs[0].data();
  const teammateEmails = team.teammateEmails || [];

  if (teammateEmails.length > 0) {
    const usersRef = query(
      collection(db, "users"),
      where("email", "in", teammateEmails)
    );
    const usersSnapshot = await getDocs(usersRef);

    const registeredTeamMembers = usersSnapshot.docs.map(
      (doc) => doc.data().email
    );

    return { ...team, registeredTeamMembers };
  }

  return team;
};

export const createTeamMemberAccountInDB = async (user) => {
  const password = generatePassword();
  const userRef = await createUserWithEmailAndPassword(
    auth,
    user.memberEmail,
    password
  );
  const userId = userRef.user.uid;

  const teammateEmails = [
    ...user.teammateEmails.filter((mail) => mail !== user.memberEmail),
    user?.captainEmail,
  ];

  const userData = {
    birthDate: formatDOB(user.dob.startDate),
    boxNumber: user.boxNumber,
    categoryName: user.category,
    categoryPrice: splitCategoryNameAndPrice([user.category])[0].price,
    city: spain_cities.find((city) => city.id === user.city).nm,
    country: user.country,
    createdAt: new Date().toISOString(),
    email: user.memberEmail,
    firstName: user.firstName,
    gender: user.gender,
    isActive: true,
    isPaid: false,
    lastName: user.lastName,
    phoneNumber: user.phone,
    platform: "app",
    postalCode: user.postalCode,
    province: provinces.find((province) => province.id === user.province).nm,
    street: user.street,
    userId: userId,
    profilePicture: "",
    updatedAt: new Date().toISOString(),
    number: user.streetNumber,
    teammateEmail: teammateEmails,
    teamName: user.teamName,
    teamId: user.teamId,
    teamBanner: "",
    weight: 0,
  };

  const teamRef = doc(db, "teams", user.teamId);
  const team = await getDoc(teamRef);
  await setDoc(
    teamRef,
    {
      teammateGenders: [...team.data().teammateGenders, user.gender],
    },
    { merge: true }
  );

  await setDoc(doc(db, "users", userId), userData);

  await sendMails({
    emails: [user.memberEmail],
    subject: emailSubject,
    body: selfEmailTemplate({
      category: user.category,
      password: password,
    }),
  });

  return {
    teamId: user.teamId,
    member: {
      id: userId,
      profileImage: "",
      email: user?.memberEmail,
      name: user?.firstName + " " + user?.lastName,
      teamName: user?.teamName,
      isCaptain: false,
      gender: user?.gender,
    },
  };
};
