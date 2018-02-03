import axios from 'axios';
// import jwt from 'jsonwebtoken';
import faker from 'faker';
import constants from '../config/constants';

// const username = faker.internet.userName();
// const email = faker.internet.email();
const message = faker.lorem.sentences();
// let TOKEN;
// let RESULT;

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

  /* test('After user register send a message', async () => {
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

    try {
      const postMessage = await axios.post(
        `http://localhost:${constants.PORT}/graphql`,
        {
          query: `
            mutation {
              createMessage(coin: "bitcoin", text: "${message}")
            }
          `,
        },
        {
          headers: { 'x-token': TOKEN },
        },
      );
      const { createMessage } = postMessage.data.data;
      RESULT = createMessage;
    } finally {
      console.log(RESULT);
    }
  }); */

  /* test('After login return messages for bitcoin', async () => {
    try {
      const getMessage = await axios.post(
        `http://localhost:${constants.PORT}/graphql`,
        {
          query: `
          {
            getMessages(coin: "bitcoin") {
              postedBy {
                username
              }
            }
          }
          `,
        },
        {
          headers: { 'x-token': TOKEN },
        },
      );

      const { data } = await getMessage;
      expect(data).toMatchObject({
        data: {
          getMessages: {
            postedBy: {
              username,
            },
          },
        },
      });
    } catch (err) {}
  }); */
});
