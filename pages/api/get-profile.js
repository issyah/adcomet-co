/*** api to retrieve personal information of the user**/

import { getFirestore, getDoc, doc } from "firebase/firestore";
import firebase_app from "../../src/firebase";
const db = getFirestore(firebase_app);
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(400);
  }

  let body;
  try {
    body = req.query;
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Not authorized",
    });
  }
  const { id } = body;
  if (!id) {
    return res.status(401).json({
      status: false,
      mesage: "Not auhorized",
    });
  }
  const docRef = doc(db, "users", id);
  try {
    const docSnap = await getDoc(docRef);
  } catch (error) {
    return res.status(400).json({
      status: true,
      message: error.message
    })    
  }

  if (docSnap.exists()) {
    return res.status(200).json({
      ...docSnap.data(),
    });
  }

  return res.status(400).json({
    status: true,
    message: "Error fetchin user data",
  });

  // retrieve via userid

  // return res.status(200).json({...payload});
}
