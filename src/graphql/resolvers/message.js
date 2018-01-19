import { PubSub, withFilter } from 'graphql-subscriptions';

import Message from '../../models/Message';
import User from '../../models/User';
import { requireAuth } from '../../services/auth';

const pubsub = new PubSub();

const NEW_MESSAGE = 'NEW_MESSAGE';

export default {
  Subscription: {
    newCoinMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        (payload, args) => payload.coin === args.coin,
      ),
    },
  },

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
    createMessage: async (parent, args, { user }) => {
      try {
        await requireAuth(user);
        const message = await Message.create({ ...args, user: user._id });

        const asyncFunc = async () => {
          const currentUser = await User.findById(user._id);

          /* Publish with subscriptions */
          pubsub.publish(NEW_MESSAGE, {
            coin: args.coin,
            newCoinMessage: {
              _id: message._id,
              text: message.text,
              coin: message.coin,
              likeCount: message.likeCount,
              user: currentUser,
            },
          });
        };

        asyncFunc();

        return true;
      } catch (err) {
        return false;
      }
    },
  },
};
