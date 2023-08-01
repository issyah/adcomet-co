/**
 * setup the token access */
import jwt from 'jsonwebtoken';

export const handlePermission = (authorization, permissionType, arr) => {
  let result, error;
  if (!authorization) {
    error = 'You are not allowed to perform this action';
    return { error }
  };

  const token = authorization.split(" ")[1];
  if (!token) {
    error = 'You are not allowed to perform this action';
    return { error }
  }
  try {
    result = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
  } catch (e) {
    error = e.message;
    return { error }
  }
  if (!arr.includes(result[permissionType])) {
    error = 'You are not allowed to perform this action';
    return { error };
  }

  // success 
  return {
    result,
    error
  }
}