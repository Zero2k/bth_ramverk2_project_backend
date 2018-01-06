export default `
  type Response {
    success: Boolean!
    data: Coin!
  }

  type ResponseArray {
    success: Boolean!
    data: [Coin!]
  }

  type CoinImage {
    success: Boolean!
    image_url: String
  }

  type Coin {
    id: String
    name: String
    symbol: String
    rank: String
    price_usd: String
    price_btc: String
    market_cap_usd: Int
    total_supply: Int
    max_supply: Int
    percent_change_1h: String
    percent_change_24h: String
    percent_change_7d: String
    last_updated: String
    image: CoinImage
  }

  type Query {
    coinByName(name: String!): Response
    topTenCoins(limit: Int!): ResponseArray
  }
`;
