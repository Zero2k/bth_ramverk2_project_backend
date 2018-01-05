import User from '../../models/User';
import { requireAuth } from '../../services/auth';

export default {
  User: {},

  Query: {
    allUsers: async (parent, args, { user }) => {
      try {
        await requireAuth(user);
        return User.find({}).sort({ createdAt: -1 });
      } catch (err) {
        throw err;
      }
    },
    me: async (parent, args, { user }) => {
      try {
        const me = await requireAuth(user);

        return me;
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    signup: async (parent, { email, password, username }) => {
      try {
        const userCredentials = { email, password, username };
        const user = await User.create(userCredentials);

        return {
          success: true,
          token: user.createToken(),
        };
      } catch (err) {
        /* throw err; */
        return {
          success: false,
        };
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('No user exists');
        }

        if (!user.authenticateUser(password)) {
          throw new Error('Wrong password');
        }

        return {
          success: true,
          token: user.createToken(),
        };
      } catch (err) {
        /* throw err; */
        return {
          success: false,
        };
      }
    },
    /* REMOVE THIS IN PRODUCTION */
    deleteUsers: async (parent, args) => {
      try {
        const user = await User.remove();
        if (user) {
          return {
            remove: true,
          };
        }
      } catch (err) {
        throw err;
      }
    },
    /* REMOVE THIS IN PRODUCTION */
  },
};
