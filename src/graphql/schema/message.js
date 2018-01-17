export default `
  type Message {
    _id: ID!
    text: String!
    user: User!
    coin: String!
    likeCount: Int!
  }

  type Query {
    getMessage(_id: ID!): Message
  }
`;
