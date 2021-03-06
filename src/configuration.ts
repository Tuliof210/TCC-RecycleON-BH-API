export default () => ({
  environment: process.env.ENVIRONMENT || 'development',
  database: process.env.DATABASE_HOST,
  secretkeys: {
    jwt: process.env.JWT_SECRET,
    master: process.env.MASTER_KEY,
    google: process.env.GOOGLE_APIKEY,
  },
  locationsExternalApi: process.env.LOCATIONS_EXTERNAL_API,
  cronUpdateLocations: process.env.CRON_UPDATE_LOCATIONS || '*/10 * * * * *',
  wikiSpreadsheet: process.env.WIKI_SPREADSHEET,
});
