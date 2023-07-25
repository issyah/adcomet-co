import { getDownloadURL, getStorage, ref } from "firebase/storage";
import firebase_app from "../../src/firebase";
const storage = getStorage(firebase_app);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(400);
  }

  const { path } = req.query;
  if (path) {
    return res.status(400);
  }

  const ref = ref(storage, path);
  let downloadUrl;
  try {
    downloadUrl = await getDownloadURL(ref);
  } catch (e) {
    return res.status(400).json({
      status: "error",
      message: e.message,
    });
  }

  const result = await fetch(downloadUrl);
  res.setHea
}
