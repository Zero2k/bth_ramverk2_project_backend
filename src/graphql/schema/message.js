export default `
  type Message {
    _id: ID!
    text: String!
    postedBy(limit: String): User!
    coin: String!
    likeCount: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type Subscription {
    newCoinMessage(coin: String!): Message!
  }

  type Query {
    getMessage(_id: ID!): Message
    getMessages(offset: Int!, coin: String!): [Message!]!
  }

  type Mutation {
    createMessage(coin: String!, text: String!): Boolean!
  }
`;
