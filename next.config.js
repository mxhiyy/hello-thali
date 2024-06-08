module.exports = {
  env: {
    MONGO_URI: process.env.MONGO_URI,
    BITTS_AUTH_KEY: process.env.JWT_SECRET,
    JWT_SECRET: process.env.BITTS_AUTH_KEY,
  },
};
