import { getCoinByName, getTopTenCoins } from '../../services/coinmarketcap';
import { getCoinImage } from '../../services/cryptocompare';
import { searchCoins } from '../../services/autocomplete';

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
    /* searchCoinsApi: async (parent, { limit = 0, name }, context) => {
      let dataArray = [];

      const { data } = await getTopTenCoins(limit);
      dataArray = data;

      const result = dataArray.filter(x => x.id.includes(name));

      if (data.length > 0) {
        return {
          success: true,
          data: result,
        };
      }
      return {
        success: false,
        data: [{}],
      };
    }, */
    searchCoins: (parent, { name }, context) => {
      return searchCoins(name);
    },
  },
};
