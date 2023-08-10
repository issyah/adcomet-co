// Import the functions you need from the SDKs you need
// import { initializeApp, getApps } from "firebase/app";
// import { initializeApp } from "firebase-admin/app";
// import { getApps } from "firebase-admin/app";
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

// // Initialize Firebase
// let firebase_admin_app =
//   getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// export default firebase_admin_app;

// import { initializeApp } from "firebase-admin/app";

import admin from 'firebase-admin';
import serviceAccount from '../adcommet-907a4-firebase-adminsdk-7mupt-9da5cb6a53.json';
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        ...serviceAccount,
        private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
        private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID
      }),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    });
  } catch (e) {
    console.log(e);
  }
}


export default admin;

