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
    signup: async (parent, { email, password, username }, context) => {
      try {
        const userCredentials = { email, password, username };
        const user = await User.create(userCredentials);

        return {
          success: true,
          token: user.createToken(),
        };
      } catch (err) {
        return {
          success: false,
        };
      }
    },
    login: async (parent, { email, password }, context) => {
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
        return {
          success: false,
        };
      }
    },

    updateUser: async (parent, { _id, ...rest }, { user }) => {
      try {
        await requireAuth(user);
        const currentUser = await User.findOne({ _id: user._id });

        if (!currentUser) {
          throw new Error('Not found');
        }

        Object.entries(rest).forEach(([key, value]) => {
          currentUser[key] = value;
        });

        return currentUser.save();
      } catch (error) {
        throw error;
      }
    },
  },
};
