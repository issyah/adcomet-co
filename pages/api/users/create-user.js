/***
 * An API to create new users via firebase admin SDK
 */

// import firebase_admin_app from "../../src/firebase-admin";
// import { getFirestore } from "firebase-admin/firestore";
import moment from "moment";
import admin from "../../../utils/firebase-admin";
import jwt from 'jsonwebtoken';
const auth = admin.auth();
// const db = getFirestore(firebase_admin_app);
const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(401).json({
      message: 'Not authorized'
    });
  }
  // get authorization header 
  const authorization = req.headers['authorization'];
  if (!authorization) {
    return res.status(401).json({ message: 'Not authorized. Token not valid' });
  };
  const token = authorization.split(" ")[1];
  // check authorization 
  // const { role, companyId } = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
  // if (!role || role !== 'admin' || !companyId) {
  //   return res.status(401).json({ message: 'Not authorized' });
  // }
  if (!token) {
    return res.status(401).json({ message: 'Your are not authorized to perform this action.' });
  }
  let userToken;
  try {
    userToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
  } catch (error) {
    res.status(400).json({
      message: error.message,
      code: error.code
    });
  };
  const { role, companyId } = userToken;
  if (role !== 'admin') {
    // you are not allowed to access this resource 
    res.status(401).json({ message: 'You are not authorized to perform this action.' })
  };

  const {
    firstName,
    lastName,
    email,
    password,
    designation,
  } = JSON.parse(req.body);



  if (!firstName || !lastName || !email || !password || !designation) {
    return res.status(400).json({
      message: "Missing required fields",
    })
  }
  // create new user via createUser 
  let result;
  try {
    result = await auth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
      emailVerified: false,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message
    })
  };

  // add new user in db 
  let resUser;
  const userData = {
    firstName,
    lastName,
    email,
    designation,
    company: {
      id: companyId,
      userType: 'user'
    },
    uid: result.uid,
  }
  try {
    resUser = await db.collection('users').doc(result.uid).set(userData);
  } catch (e) {
    return res.status(400).json({
      message: e.message
    })
  }
  return res.status(200).json({
    ...userData,
    id: resUser.id,
    created: new Date(),
    lastSeen: new Date(),
    userType: 'user',
  })

}