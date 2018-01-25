import jwt from 'jsonwebtoken';

import constants from '../config/constants';
import User from '../models/User';

/**
 * Authnticate the user by checking if token is valid
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const authenticateUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, constants.JWT_SECRET_ONE);
      req.user = user;
    } catch (err) {
      req.user = null;
    }
  }
  next();
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
