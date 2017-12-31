import axios from 'axios';
import constants from '../src/config/constants';
import jwt from 'jsonwebtoken';

describe('Test user resolvers with GraphQL', () => {
  test('Login should return a JSON Web Token', async () => {
    const response = await axios.post(`http://localhost:${constants.PORT}/graphql`, {
      query: `
      mutation {
        login(email: "test@test.com", password: "testtest") {
          token
        }
      }
      `,
    });

    const { token } = response.data.data.login;
    const tokenPayload = jwt.decode(token, { complete: true }).payload;

    expect(tokenPayload).toHaveProperty('_id');
    expect(tokenPayload).toHaveProperty('iat');
    expect(tokenPayload).toHaveProperty('exp');
  });
});
