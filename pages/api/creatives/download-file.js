/**
 * Download file from firebase storage
**/


// import firebase_app from "../../../src/firebase";
// import { getDownloadURL, getStorage, ref } from "firebase/storage";
import admin from "../../../utils/firebase-admin";
const storage = admin.storage();
export default async function handler(req, res) {
  if (req.method != 'GET') {
    return res.status(400).json({ message: 'You are not authorized to perform this action.' });
  };
  console.log(req);
  const { path, type } = req.query;
  // const storageRef = ref(storage, path);
  let file; 
  try {
  } catch (error) {
    return res.status(400).json({
      code: error.code,
      message: error.message,
    })
  }
  // return new Response(response.body, {
  //   headers: {
  //     ...response.headers,
  //     "content-disposition": `attachment; filename=${file}`,
  //   }
  // });
}