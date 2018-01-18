import { requireAuth } from '../../services/auth';
import Message from '../../models/Message';
import User from '../../models/User';

export default {
  Message: {
    postedBy: ({ user }, args, context) => {
      return User.findById(user);
    },
  },

  Query: {
    getMessage: async (parent, { _id }, { user }) => {
      try {
        await requireAuth(user);
        return await Message.findById(_id);
      } catch (err) {
        throw err;
      }
    },
    getMessages: async (parent, { coin }, { user }) => {
      try {
        await requireAuth(user);
        return await Message.find({ coin });
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    createMessage: async (parent, { coin, text }, { user }) => {
      try {
        await requireAuth(user);
        const message = await Message.create({ coin, text, user: user._id });

        /* Publish with subscriptions */

        return message;
      } catch (err) {
        throw err;
      }
    },
  },
};
