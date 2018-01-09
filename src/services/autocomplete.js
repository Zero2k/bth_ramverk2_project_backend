import coins from '../data/coin_data';

export const searchCoins = name => {
  const result = coins.filter(x => x.id.includes(name.toLowerCase()));

  if (result.length === 0) {
    return {
      success: false,
      data: [{}],
    };
  }
  return {
    success: true,
    data: result,
  };
};
