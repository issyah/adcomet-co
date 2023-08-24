/***
 * An API to create new users via firebase admin SDK
 */

// import firebase_admin_app from "../../src/firebase-admin";
// import { getFirestore } from "firebase-admin/firestore";
import moment from "moment";
import admin from "@/utils/firebase-admin";
import jwt from "jsonwebtoken";
import { handlePermission } from "@/utils/handlePermission";
const auth = admin.auth();
// const db = getFirestore(firebase_admin_app);
const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  // get authorization header
  const authorization = req.headers["authorization"];
  const { result: r, error } = handlePermission(authorization, "companyRole", [
    "admin",
    "owner"
  ]);
  if (error) {
    return res.status(400).json({
      message: error,
    });
  }
  const { role, companyId, companyRole } = r;
  const { firstName, lastName, email, password, designation } = JSON.parse(
    req.body
  );

  console.log(role);
  if (!firstName || !lastName || !email || !password || !designation) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }
  // create new user via createUser
  let result;
  try {
    result = await auth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
      emailVerified: false,
      role: role
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }

  // add new user in db
  let resUser;
  const userData = {
    firstName,
    lastName,
    email,
    designation,
    company: {
      id: companyId,
      userType: "user",
    },
    created: new Date(),
    lastSeen: new Date(),
    role: role,
    uid: result.uid,
  };
  try {
    resUser = await db.collection("users").doc(result.uid).set(userData);
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
  return res.status(200).json({
    ...userData,
    id: result.uid,
    userType: "user",
  });
}
