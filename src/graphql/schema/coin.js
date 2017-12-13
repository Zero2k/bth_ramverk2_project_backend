export default `
  type Response {
    success: Boolean!
    data: Coin!
  }

  type ResponseArray {
    success: Boolean!
    data: [Coin!]
  }

  type Coin {
    id: String
    name: String
    symbol: String
    rank: String
    price_usd: Int
    price_btc: Int
    market_cap_usd: Int
    total_supply: Int
    max_supply: Int
    percent_change_1h: Int
    percent_change_24h: Int
    percent_change_7d: Int
    last_updated: String
  }

  type Query {
    coinByName(name: String!): Response
    topTenCoins(limit: Int!): ResponseArray
  }
`;
