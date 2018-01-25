import DataLoader from 'dataloader';
import _ from 'lodash';
import User from '../models/User';

export const userLoader = new DataLoader(async (userIds) => {
  const users = await User.find({ _id: { $in: userIds } });

  const usersById = _.keyBy(users, '_id');
  return userIds.map(userId => usersById[userId]);
});
