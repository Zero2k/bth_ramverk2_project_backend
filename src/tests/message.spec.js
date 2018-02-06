import axios from 'axios';
import { GraphQLClient } from 'graphql-request';
import faker from 'faker';
import constants from '../config/constants';

const username = faker.internet.userName();
const email = faker.internet.email();
const message = faker.lorem.sentences();
let TOKEN;

describe('Test message resolvers with GraphQL', () => {
  test('Test send message without being authenticated', async () => {
    const postMessage = await axios.post(`http://localhost:${constants.PORT}/graphql`, {
      query: `
        mutation {
          createMessage(coin: "bitcoin", text: "${message}")
        }
      `,
    });
    const { createMessage } = postMessage.data.data;

    expect(createMessage).toBe(false);
  });

  test('Register user to get token', async () => {
    const register = await axios.post(`http://localhost:${constants.PORT}/graphql`, {
      query: `
        mutation {
          signup(email: "${email}", password: "password", username: "${username}") {
            token
          }
        }
      `,
    });

    const { token } = await register.data.data.signup;
    TOKEN = token;
  });

  test('Send message after user registration', async () => {
    const client = new GraphQLClient(`http://localhost:${constants.PORT}/graphql`, {
      headers: {
        'x-token': TOKEN,
      },
    });

    const query = `
      mutation {
        createMessage(coin: "bitcoin", text: "${message}")
      }
    `;

    const { createMessage } = await client.request(query);
    expect(createMessage).toBe(true);
  });

  test('After login return at least one message from the bitcoin channel', async () => {
    const client = new GraphQLClient(`http://localhost:${constants.PORT}/graphql`, {
      headers: {
        'x-token': TOKEN,
      },
    });

    const query = `
      {
        getMessages(coin: "bitcoin") {
          text
        }
      }
    `;

    const { getMessages } = await client.request(query);
    expect(getMessages.length).toBeGreaterThanOrEqual(1);
  });
});
