const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  dev: {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    frontEndHost: process.env.FRONT_HOST,
    sessionName: process.env.SESS_NAME,
    sessionSecret: process.env.SESS_SECRET,
    dbHost: process.env.DBHOST,
    dbUser: process.env.DBUSER,
    dbPass: process.env.DBPASS,
    dbName: process.env.DB,
    dbDebug: process.env.DBDEBUG,
  },
};
