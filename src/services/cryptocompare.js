import axios from 'axios';

const URL = 'https://www.cryptocompare.com';

export const getCoinImage = async (symbol) => {
  try {
    let symbolValue = symbol;
    if (!symbolValue) {
      return {
        success: false,
        image_url: 'Symbol does not exist',
      };
    }

    const response = await axios.get(`${URL}/api/data/coinlist/`);

    const { Data } = response.data;

    /* Fix problem with different symbols between coinmarketcap.com and cryptocompare.com */
    symbolValue = (symbolValue === 'MIOTA' ? 'IOT' : symbolValue);
    symbolValue = (symbolValue === 'HSR' ? 'BCH' : symbolValue);
    symbolValue = (symbolValue === 'VERI' ? 'VRM' : symbolValue);
    symbolValue = (symbolValue === 'BCC' ? 'BCCOIN' : symbolValue);

    const imageUrl = Data[symbolValue].ImageUrl;

    return {
      success: true,
      image_url: `${URL}${imageUrl}`,
    };
  } catch (err) {
    if (err) {
      return {
        success: false,
        image_url: 'error',
      };
    }
  }
};
