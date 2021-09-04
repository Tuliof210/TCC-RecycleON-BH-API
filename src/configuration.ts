export default () => ({
  environment: process.env.ENVIRONMENT || 'development',
  database: process.env.DATABASE_HOST,
  secretkeys: {
    jwt: process.env.JWT_SECRET,
    master: process.env.MASTER_KEY,
  },
  cityZone: {
    number: Number(process.env.CITY_ZONE_NUMBER),
    letter: process.env.CITY_ZONE_LETTER,
  },
  cronUpdateLocations: process.env.CRON_UPDATE_LOCATIONS || '*/10 * * * * *',
});
