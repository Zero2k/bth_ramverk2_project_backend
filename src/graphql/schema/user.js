export default `
  scalar Date

  type Auth {
    success: Boolean!,
    token: String
  }

  type Del {
    remove: Boolean
  }

  type User {
    _id: ID!
    username: String!
    avatar: String
    email: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    allUsers: [User!]
    me: User!
  }

  type Mutation {
    signup(email: String!, password: String!, username: String!): Auth
    login(email: String!, password: String!): Auth

    deleteUsers: Del
  }
`;
