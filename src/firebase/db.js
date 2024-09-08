import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

// Function to save user data to Firestore
export const saveUserDataToFirestore = async (uid, email, username) => {
  try {
    await addDoc(collection(db, "users"), {
      uid: uid,
      email: email,
      username: username,
    });
  } catch (error) {
    throw error;
  }
};
