import { getCoinByName, getTopTenCoins } from 'async-coinmarketcap-api';
/* import { getCoinByName, getTopTenCoins } from '../../services/coinmarketcap'; */
import { getCoinImage } from '../../services/cryptocompare';
import { searchCoins } from '../../services/autocomplete';
/* import { requireAuth } from '../../services/auth'; */

export default {
  Coin: {
    image: async ({ symbol }, args, { user }) => {
      /* await requireAuth(user); */
      return getCoinImage(symbol);
    },
  },

  Query: {
    coinByName: async (parent, { name }, { user }) => {
      /* await requireAuth(user); */
      return getCoinByName(name);
    },
    topTenCoins: async (parent, { limit = 10 }, { user }) => {
      /* await requireAuth(user); */
      return getTopTenCoins(limit);
    },
    /* searchCoinsApi: async (parent, { limit = 0, name }, { user }) => {
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
    searchCoins: async (parent, { name }, { user }) => {
      /* await requireAuth(user); */
      return searchCoins(name);
    },
  },
};
