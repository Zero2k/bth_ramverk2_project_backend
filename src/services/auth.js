import jwt from 'jsonwebtoken';

import constants from '../config/constants';
import User from '../models/User';

/**
 * Decode the token to check if it's valid
 *
 * @param {string} token JSON Web Token
 */
export const decodeToken = (token) => {
  const arr = token.split(' ');

  if (arr[0] === 'Bearer') {
    return jwt.verify(arr[1], constants.JWT_SECRET_ONE);
  }

  throw new Error('Token is not valid!');
};

/**
 * Authnticate the user by checking if token is valid
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token != null) {
      const user = await decodeToken(token);
      req.user = user;
    } else {
      req.user = null;
    }
    return next();
  } catch (error) {
    throw error;
  }
};

/**
 * Check if user exists in the context (GraphQL) and then i try to find it in the database.
 * If the user is not found in the database, the request is unauthorized
 *
 * @param {object} user User Object from GraphQL Context
 */
export const requireAuth = async (user) => {
  if (!user || !user._id) {
    throw new Error('Unauthorized!');
  }

  const me = await User.findById(user._id);

  if (!me) {
    throw new Error('Unauthorized!');
  }

  return me;
};
