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
import { auth, db } from "../../firebase";
import { encryptRole, formatDate } from "./functions";
import { signInWithEmailAndPassword } from "firebase/auth";

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

      workout.startDate = startDate.toISOString().slice(0, 16);
      workout.endDate = endDate.toISOString().slice(0, 16);
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

// Helper function to split array into chunks of a given size
const chunkArray2 = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

export const getUsersFromDB = async () => {
  try {
    // Fetch active workouts
    const workoutRef = await getDocs(
      query(collection(db, "Work_outs"), where("status", "==", "active"))
    );
    const activeWorkoutIds = workoutRef.docs.map((doc) => doc.id);

    // Fetch users
    const usersRef = await getDocs(collection(db, "users"));
    const users = usersRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Fetch videos in chunks if activeWorkoutIds exceeds 30
    const videos = [];
    const chunks = chunkArray2(activeWorkoutIds, 30);

    for (const chunk of chunks) {
      const videosRef = await getDocs(
        query(collection(db, "Videos"), where("wodId", "in", chunk))
      );
      videosRef.docs.forEach((doc) => {
        videos.push({ ...doc.data() });
      });
    }

    // Process videos by user
    const data = users.map((user) => {
      const userWorkouts = {};
      videos
        .filter((video) => video?.userId === user?.id)
        .forEach((video) => {
          if (userWorkouts[video?.wodId]) {
            userWorkouts[video?.wodId].push(video);
          } else {
            userWorkouts[video?.wodId] = [video];
          }
        });

      const userVideos = {
        totalRegistered: Object?.keys(userWorkouts)?.length || 0,
        totalApproved: 0,
      };

      for (const workoutId in userWorkouts) {
        userWorkouts[workoutId] = userWorkouts[workoutId].sort(
          (a, b) => a.uploadTime - b.uploadTime
        );

        const lastVideo = userWorkouts[workoutId][0];

        if (lastVideo?.status === "approved") {
          userVideos.totalApproved += 1;
        }
      }

      return {
        id: user.id,
        profileImage: user.profilePicture,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        teamName: user.teamName,
        weight: user.weight,
        token: user?.FCMToken,
        totalRegisteredWorkouts: userVideos.totalRegistered,
        totalApprovedWorkouts: userVideos.totalApproved,
        ...user,
      };
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export const getTeamsFromDB = async () => {
  const querySnapshot = await getDocs(collection(db, "teams"));
  const data = [];

  if (querySnapshot.empty) {
    return data;
  }

  const teamDocs = querySnapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data(),
  }));

  const teamCreatorIds = teamDocs.map((team) => team.teamCreatorId);

  // Break down teamCreatorIds into chunks of 30
  const teamCreatorIdsChunks = chunkArray(teamCreatorIds, 30);

  const userMap = new Map();

  for (const chunk of teamCreatorIdsChunks) {
    const usersQuery = query(
      collection(db, "users"),
      where("__name__", "in", chunk)
    );

    const usersSnapshot = await getDocs(usersQuery);
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      userMap.set(userDoc.id, userData);
    }
  }

  teamDocs.forEach((team) => {
    const teamOwnerData = userMap.get(team.teamCreatorId) || {};

    data.push({
      id: team.teamId,
      teamName: team.teamName,
      teamCategory: team.teamCategory,
      teamOwner: `${teamOwnerData.firstName || ""} ${
        teamOwnerData.lastName || ""
      }`,
      teamOwnerEmail: teamOwnerData.email || "",
      platform: team.platform || "",
      ...team,
    });
  });

  return data;
};

export const getTeamMembersFromDB = async (teamId) => {
  const querySnapshot = await getDoc(doc(collection(db, "teams"), teamId));
  const teamMembers = querySnapshot.data().teammateEmails;
  const captain = querySnapshot.data().creatorEmail;
  teamMembers.push(captain);

  if (!teamMembers || teamMembers.length === 0) {
    return [];
  }

  const usersRef = await getDocs(
    query(collection(db, "users"), where("email", "in", teamMembers))
  );

  const userMap = new Map();
  usersRef.forEach((doc) => {
    const user = doc.data();
    userMap.set(user.email, {
      id: doc.id,
      profileImage: user.profilePicture || "",
      email: user.email,
      name: `${user.firstName || ""} ${user.lastName || ""}`,
      teamName: user.teamName || "",
      isCaptain: user.email === captain,
      gender: user.gender,
    });
  });

  const data = teamMembers.map((email) => {
    return (
      userMap.get(email) || {
        id: "",
        profileImage: "",
        email: email,
        name: "",
        teamName: "",
        isCaptain: email === captain,
        gender: "",
      }
    );
  });

  return data;
};

export const updateUserWeightInDB = async ({ userId, weight }) => {
  const docRef = doc(db, "users", userId);
  await setDoc(docRef, { weight }, { merge: true });
  return { userId, weight };
};

export const getActiveWorkoutsFromDB = async () => {
  const docsRef = await getDocs(collection(db, "prod_ranking"));
  const data = {};

  for (const docSnapshot of docsRef.docs) {
    if (docSnapshot.id === "globalRanking") {
      continue;
    }

    const res = docSnapshot.data();
    const workoutDocRef = doc(db, "Work_outs", docSnapshot.id);
    const workoutSnapshot = await getDoc(workoutDocRef);
    const workout = workoutSnapshot.data();
    console.log("workout: ", workout);

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

  console.log("Data: ", data);

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

  const rankingDocRef = doc(db, "prod_ranking", workoutId);
  const res = await getDoc(rankingDocRef);

  if (res.exists()) {
    const ranking = res.data();
    const user = ranking[userId];
    if (
      (videoMinutes && +videoMinutes !== 0) ||
      (videoSeconds && +videoSeconds !== 0)
    ) {
      user.uploadTime = `${videoMinutes} min ${videoSeconds} sec`;
    }

    if (liftedWeight && +liftedWeight !== 0) {
      user.liftedWeight = `${liftedWeight}`;
    }

    if (repetitions && +repetitions !== 0) {
      user.repetitions = `${repetitions}`;
    }
    await setDoc(rankingDocRef, { [userId]: user }, { merge: true });
  }

  return { videoId, userId, status };
};

export const getRankingDataFromDB = async ({ userId, workoutId }) => {
  const rankingDocRef = doc(db, "prod_ranking", workoutId);
  const res = await getDoc(rankingDocRef);
  const videoRef = query(
    collection(db, "Videos"),
    where("userId", "==", userId),
    where("wodId", "==", workoutId)
  );

  const videoSnapshot = await getDocs(videoRef);
  const video = videoSnapshot?.docs[0]?.data();

  if (res.exists()) {
    const ranking = res.data();
    const user = ranking[userId];
    const data = {
      liftedWeight: user.liftedWeight,
      repetitions: user.repetitions,
      uploadTime: user.uploadTime,
      judgeName: video?.judgeName || "",
    };

    return data;
  }
  return null;
};

export const getWorkoutVideosFromDB = async (userId) => {
  const rankingsCollection = collection(db, "prod_ranking");
  const rankingsSnapshot = await getDocs(rankingsCollection);

  const workoutIds = rankingsSnapshot.docs.map((doc) => doc.id);

  const data = [];

  for (const workoutId of workoutIds) {
    const rankingDocRef = doc(db, "prod_ranking", workoutId);
    const rankingSnapshot = await getDoc(rankingDocRef);
    const ranking = rankingSnapshot.data();

    if (ranking && ranking[userId]) {
      const videoQuery = query(
        collection(db, "Videos"),
        where("userId", "==", userId),
        where("wodId", "==", workoutId),
        orderBy("uploadTime", "desc")
      );

      const videoSnapshot = await getDocs(videoQuery);

      if (!videoSnapshot.empty) {
        const videoDoc = videoSnapshot.docs[0];
        const video = videoDoc.data();

        const workoutRef = await getDoc(doc(db, "Work_outs", workoutId));
        const workout = workoutRef.data();

        data.push({
          id: videoDoc.id,
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

export const sendMails = async ({ emails, subject, body }) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_NODE_SERVER_URL}/user/sendEmail-nodemailer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: emails,
          subject: subject,
          text: body,
          body: body,
        }),
      }
    );

    return res;
  } catch (error) {
    throw new Error("Error sending email");
  }
};

export const addNewAdminToDB = async (data) => {
  const email = data.email;
  const URL = import.meta.env.VITE_NODE_SERVER_URL;
  let res = await fetch(`${URL}/user/createUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: data?.password,
    }),
  });

  if (res.status !== 201) {
    throw new Error("Failed to create user");
  }

  const user = await res.json();

  const docRef = doc(db, "Admins", user?.data?.uid);
  const validData = {
    fullName: data.fullName,
    email: data.email,
    createdAt: new Date().toISOString(),
    uid: user?.data.uid,
    role: "secondary",
  };
  await setDoc(docRef, { ...validData, isActive: true });

  await sendMails({
    email: [data.email],
    subject: "Welcome to the Admin Panel",
    body: `Hello ${data.fullName},\n\nYou have been added as an admin to the admin panel. Your credientials are followings: \n Email: ${data.email}\n Password: ${data.password} \n\nRegards,\nAdmin Panel`,
  });

  return validData;
};

export const getAdminsFromDB = async () => {
  const querySnapshot = await getDocs(
    query(
      collection(db, "Admins"),
      where("isActive", "==", true),
      where("role", "==", "secondary")
    )
  );
  const data = [];

  querySnapshot.forEach((doc) => {
    const res = doc.data();
    data.push({
      id: doc.id,
      fullName: res.fullName,
      email: res.email,
      role: res.role,
      createdAt: res.createdAt.split("T")[0],
    });
  });

  return data;
};

export const deleteAdminFromDB = async (id) => {
  const docRef = doc(db, "Admins", id);
  await setDoc(docRef, { isActive: false }, { merge: true });
  return id;
};

export const signInAdminInDB = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    const uid = auth.currentUser.uid;

    const adminQuery = query(
      collection(db, "Admins"),
      where("uid", "==", uid),
      where("isActive", "==", true)
    );

    const querySnapshot = await getDocs(adminQuery);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      encryptRole(userData.role);
      return {
        id: userData.uid,
        fullName: userData.fullName,
        email: userData.email,
        role: userData.role,
      };
    } else {
      await auth.signOut();
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const getCouponUsersFromDB = async ({ couponName }) => {
  const querySnapshot = await getDocs(
    collection(db, "coupons", couponName, "users")
  );

  const data = [];
  if (!querySnapshot.empty) {
    for (const userDoc of querySnapshot.docs) {
      const userId = userDoc.data()?.userId;
      if (userId) {
        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);
        const user = userDocSnapshot.data();
        if (user) {
          data.push({
            userId: user?.userId,
            fullName: user?.firstName + " " + user?.lastName,
            email: user?.email,
            profileImage: user?.profilePicture,
          });
        }
      }
    }
  }

  return {
    couponName,
    users: data,
  };
};

export const getFreeCouponUsersFromDB = async ({ couponName }) => {
  const querySnapshot = await getDocs(
    query(
      collection(db, "freeCoupons"),
      where("code", "==", couponName),
      where("isUsed", "==", true)
    )
  );

  const data = [];

  if (!querySnapshot.empty) {
    for (const userDoc of querySnapshot.docs) {
      const userId = userDoc.data()?.usedBy;
      if (userId) {
        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);
        const user = userDocSnapshot.data();
        if (user) {
          data.push({
            userId: user?.userId,
            fullName: `${user?.firstName} ${user?.lastName}`,
            email: user?.email,
            profileImage: user?.profilePicture,
          });
        }
      }
    }
  }

  return {
    couponName,
    users: data,
  };
};

export const changeTeamCategoryInDB = async ({ teamId, category }) => {
  const teamRef = doc(db, "teams", teamId);
  await setDoc(
    teamRef,
    { teamCategory: category, platform: "app" },
    { merge: true }
  );

  const querySnapshot = await getDocs(
    query(collection(db, "users"), where("teamId", "==", teamId))
  );

  for (const docRef of querySnapshot.docs) {
    const userDocRef = doc(db, "users", docRef.id);
    await setDoc(userDocRef, { categoryName: category }, { merge: true });
  }

  let teamEmails = [];
  const team = (await getDoc(teamRef)).data();
  teamEmails.push(team.creatorEmail);
  teamEmails.push(...team.teammateEmails);

  await sendMails({
    emails: teamEmails,
    subject: "Team Category Change",
    body: `Hello Team, your category has been changed to ${category}.`,
  });

  return { teamId, category };
};
