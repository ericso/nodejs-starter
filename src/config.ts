const config = {
    PORT: parseInt(process.env.PORT, 10) || 5000,
    MONGO_DB_URL: 'mongodb://admin:1admin@ds145121.mlab.com:45121/es-nodejs-restful-api',
    SECRET: 'super-secret-string',
  };

export default config;
