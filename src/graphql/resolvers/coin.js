import { getCoinByName, getTopTenCoins } from '../../services/coinmarketcap';

export default {
  Query: {
    coinByName: (parent, { name }, context) => {
      return getCoinByName(name);
    },
    topTenCoins: (parent, { limit = 10 }, context) => {
      return getTopTenCoins(limit);
    },
  },
};
