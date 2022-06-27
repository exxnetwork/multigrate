import { collection, where, getDocs, query } from "firebase/firestore";
import { db, auth } from "config/firebase";

export const getUser = async (email) => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("email", "==", email));

  let data = [];

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return { data: data, length: data.length };
};
