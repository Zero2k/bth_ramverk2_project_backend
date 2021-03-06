export default {
  PORT: process.env.PORT || process.env.DBWEBB_PORT || 8080,
  DB_URL: process.env.DB_URL || process.env.DBWEBB_DSN || 'mongodb://localhost:27017',
  GRAPHQL_PATH: '/graphql',
  SUBSCRIPTIONS_PATH: '/subscriptions',
  JWT_SECRET_ONE:
    process.env.JWT_SECRET_ONE ||
    'LFoljOEDdS4KDCwjMbiOyqWlgU6vqf1t2a2XJWLdiJeF3MkfnCd86ivXLIutUZwC',
  JWT_SECRET_TWO:
    process.env.JWT_SECRET_TWO ||
    'LFoljOTEdSFE4CreDbj9fclEfD9dw2fi9a2XJWLcvFeG2dYidCd86ivXLIutUZwC',
};
