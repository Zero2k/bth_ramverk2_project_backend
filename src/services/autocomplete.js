import coins from '../data/coin_data';

/**
 * Search the coin list based on name
 *
 * @param {string} name Name of cryptocurrency
 */
export const searchCoins = (name) => {
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
