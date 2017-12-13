import axios from 'axios';

export const getCoinByName = async name => {
  try {
    const response = await axios.get(`https://api.coinmarketcap.com/v1/ticker/${name}/`);

    const { data } = response;
    const newData = {
      id: data[0].id,
      name: data[0].name,
      symbol: data[0].symbol,
      rank: parseInt(data[0].rank),
      price_usd: parseInt(data[0].price_usd),
      price_btc: parseInt(data[0].price_btc),
      market_cap_usd: parseInt(data[0].market_cap_usd),
      available_supply: parseInt(data[0].available_supply),
      total_supply: parseInt(data[0].total_supply),
      max_supply: parseInt(data[0].max_supply),
      percent_change_1h: parseInt(data[0].percent_change_1h),
      percent_change_24h: parseInt(data[0].percent_change_24h),
      percent_change_7d: parseInt(data[0].percent_change_7d),
      last_updated: new Date(parseInt(data[0].last_updated) * 1000).toJSON(),
    };

    return {
      success: true,
      data: newData,
    };
  } catch (err) {
    if (err) {
      return {
        success: false,
        data: {},
      };
    }
  }
};

export const getTopTenCoins = async limit => {
  try {
    const response = await axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=${limit}`);

    const { data } = response;
    const newData = data.map(i => {
      return {
        id: i.id,
        name: i.name,
        symbol: i.symbol,
        rank: parseInt(i.rank),
        price_usd: parseInt(i.price_usd),
        price_btc: parseInt(i.price_btc),
        market_cap_usd: parseInt(i.market_cap_usd),
        available_supply: parseInt(i.available_supply),
        total_supply: parseInt(i.total_supply),
        max_supply: parseInt(i.max_supply),
        percent_change_1h: parseInt(i.percent_change_1h),
        percent_change_24h: parseInt(i.percent_change_24h),
        percent_change_7d: parseInt(i.percent_change_7d),
        last_updated: new Date(parseInt(i.last_updated) * 1000).toJSON(),
      };
    });

    return {
      success: true,
      data: newData,
    };
  } catch (err) {
    if (err) {
      return {
        success: false,
        data: [{}],
      };
    }
  }
};
