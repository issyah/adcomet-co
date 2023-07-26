/**
 * delete a user from firebase auth and users collection*/
import admin from "../../../utils/firebase-admin"
import jwt from 'jsonwebtoken';
import { handlePermission } from "../../../utils/handlePermission";

const auth = admin.auth();
const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(400).json({
      message: "Not authorized to perform this action"
    });
  };
  const authorization = req.headers['authorization'];
  const { error, result } = handlePermission(authorization, ['admin']);
  if (error) {
    return res.status(400).json({
      message: error,
    })
  };

  const { role, companyId } = result;
  const { id } = req.query;

  // delete the user from auth 
  try {
    const authRef = await auth.deleteUser(id);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      code: error.code,
    });
  }
  // deleted user from firebase auth, now delete from collection 
  try {
    const userRef = await db.collection('users').doc(id).delete();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      code: error.code,
    })
  };
  // success 
  return res.status(200).json({
    status: true,
  });
}