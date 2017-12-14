import { getCoinByName, getTopTenCoins } from '../../services/coinmarketcap';
import { getCoinImage } from '../../services/cryptocompare';

export default {
  Coin: {
    image: ({ symbol }, args, context) => {
      return getCoinImage(symbol);
    },
  },

  Query: {
    coinByName: (parent, { name }, context) => {
      return getCoinByName(name);
    },
    topTenCoins: (parent, { limit = 10 }, context) => {
      return getTopTenCoins(limit);
    },
  },
};
