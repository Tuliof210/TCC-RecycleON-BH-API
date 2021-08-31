export default () => ({
  environment: process.env.ENVIRONMENT || 'development',
  port: parseInt(process.env.HOST_PORT, 10) || 3070,
  database: process.env.DATABASE_HOST,
  secretkeys: {
    jwt: process.env.JWT_SECRET,
    master: process.env.MASTER_KEY,
  },
});
