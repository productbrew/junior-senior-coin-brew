export const environment = {
  production: true,
  MONGO_DB_CONNECTION_URL: process.env.MONGO_DB_CONNECTION_URL as string,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};
