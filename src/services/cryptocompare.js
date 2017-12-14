import axios from 'axios';

const URL = 'https://www.cryptocompare.com';

export const getCoinImage = async (symbol) => {
  try {
    if (!symbol) {
      return {
        image_url: 'Symbol does not exist',
      };
    }

    const response = await axios.get(`${URL}/api/data/coinlist/`);

    const { Data } = response.data;
    const imageUrl = Data[symbol].ImageUrl;

    return {
      image_url: `${URL}${imageUrl}`,
    };
  } catch (err) {
    if (err) {
      return {
        image_url: 'error',
      };
    }
  }
};
