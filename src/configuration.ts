export default () => ({
  environment: process.env.ENVIRONMENT || 'development',
  database: process.env.DATABASE_HOST,
  secretkeys: {
    jwt: process.env.JWT_SECRET,
    master: process.env.MASTER_KEY,
  },
});
