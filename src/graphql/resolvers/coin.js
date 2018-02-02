import { getCoinByName, getTopTenCoins } from 'async-coinmarketcap-api';
import { getCoinImage } from '../../services/cryptocompare';
import { searchCoins } from '../../services/autocomplete';

export default {
  Coin: {
    image: async ({ symbol }, args, context) => {
      return getCoinImage(symbol);
    },
  },

  Query: {
    coinByName: async (parent, { name }, context) => {
      return getCoinByName(name);
    },
    topTenCoins: async (parent, { limit = 10 }, context) => {
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
    searchCoins: async (parent, { name }, context) => {
      return searchCoins(name);
    },
  },
};
