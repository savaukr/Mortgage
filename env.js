//import dotenv from 'dotenv';
const dotenv = require('dotenv')
dotenv.config();

const env = {
  app: {
    port: process.env.APP_PORT,
    socketPort: process.env.SOCKET_PORT,
  },
  db: {
    user : process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    database: process.env.DB_NAME
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET
  }
};

//export default env; 
module.exports = env;