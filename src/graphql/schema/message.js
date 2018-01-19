export default `
  type Message {
    _id: ID!
    text: String!
    postedBy: User!
    coin: String!
    likeCount: Int!
  }

  type Subscription {
    newCoinMessage(coin: String!): Message!
  }

  type Query {
    getMessage(_id: ID!): Message
    getMessages(coin: String!): [Message!]!
  }

  type Mutation {
    createMessage(coin: String!, text: String!): Boolean!
  }
`;
