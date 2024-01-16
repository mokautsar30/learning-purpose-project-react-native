const Redis = require("ioredis");
const redis = new Redis({
  port: 18821, // Redis port
  host: process.env.REDIS_HOST, // Redis host
  password: process.env.REDIS_PASSWORD,
});

module.exports = redis;
