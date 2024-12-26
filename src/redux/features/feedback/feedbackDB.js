import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../../firebase";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";

export const addFeedbackInDB = async (data) => {
  const feedbackRef = doc(collection(db, "feedbacks"));
  let fileURL = null;

  if (data.file) {
    const fileRef = ref(
      storage,
      `feedbackFiles/${feedbackRef.id}/${data.file.name}`
    );
    try {
      const snapshot = await uploadBytes(fileRef, data.file);

      fileURL = await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error("File upload failed:", error);
      throw new Error("Failed to upload file");
    }
  }

  await setDoc(feedbackRef, {
    ...data,
    file: fileURL || null,
    createdAt: Timestamp.now(),
  });

  return feedbackRef.id;
};
