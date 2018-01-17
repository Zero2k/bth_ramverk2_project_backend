import { requireAuth } from '../../services/auth';

export default {
  Message: {},

  Query: {
    getMessage: async (parent, args, { user }) => {
      try {
        await requireAuth(user);
        return {
          _id: 1,
          text: 'test message',
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
