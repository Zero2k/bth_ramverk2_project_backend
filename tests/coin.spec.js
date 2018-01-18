import axios from 'axios';
import constants from '../src/config/constants';

describe('Test coin resolvers with GraphQL', () => {
  test('It should return data about Bitcoin', async () => {
    const response = await axios.post(`http://localhost:${constants.PORT}/graphql`, {
      query: `
      {
        coinByName(name: "bitcoin") {
          success
          data {
            id
            name
          }
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        coinByName: {
          success: true,
          data: {
            id: 'bitcoin',
            name: 'Bitcoin',
          },
        },
      },
    });
  });

  test('It should return a list with top three cryptocurrencies', async () => {
    const response = await axios.post(`http://localhost:${constants.PORT}/graphql`, {
      query: `
      {
        topTenCoins(limit: 3) {
          success
          data {
            id
            name
          }
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        topTenCoins: {
          success: true,
          data: [
            {
              id: 'bitcoin',
              name: 'Bitcoin',
            },
            {
              id: 'ethereum',
              name: 'Ethereum',
            },
            {
              id: 'ripple',
              name: 'Ripple',
            },
          ],
        },
      },
    });
  });

  test('It should return a link to Bitcoins logo', async () => {
    const response = await axios.post(`http://localhost:${constants.PORT}/graphql`, {
      query: `
      {
        coinByName(name: "bitcoin") {
          success
          data {
            image {image_url}
          }
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        coinByName: {
          success: true,
          data: {
            image: {
              image_url: 'https://www.cryptocompare.com/media/19633/btc.png',
            },
          },
        },
      },
    });
  });
});
