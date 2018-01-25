import axios from 'axios';
import jwt from 'jsonwebtoken';
import faker from 'faker';
import constants from '../src/config/constants';

const username = faker.internet.userName();
const email = faker.internet.email();

describe('Test user resolvers with GraphQL', () => {
  test('After user register a JSON Web Token should be returned', async () => {
    const response = await axios.post(`http://localhost:${constants.PORT}/graphql`, {
      query: `
      mutation {
        signup(email: "${email}", password: "password", username: "${username}") {
          token
        }
      }
      `,
    });

    const { token } = await response.data.data.signup;
    const tokenPayload = jwt.decode(token, { complete: true }).payload;

    expect(tokenPayload.user).toHaveProperty('_id');
    expect(tokenPayload).toHaveProperty('iat');
    expect(tokenPayload).toHaveProperty('exp');
  });

  test('Login should return a JSON Web Token', async () => {
    const response = await axios.post(`http://localhost:${constants.PORT}/graphql`, {
      query: `
      mutation {
        login(email: "${email}", password: "password") {
          token
        }
      }
      `,
    });

    const { token } = await response.data.data.login;
    const tokenPayload = jwt.decode(token, { complete: true }).payload;

    expect(tokenPayload.user).toHaveProperty('_id');
    expect(tokenPayload).toHaveProperty('iat');
    expect(tokenPayload).toHaveProperty('exp');
  });
});
