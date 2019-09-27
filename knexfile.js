const env = require('./config');

module.exports = {
  development: {
    client: 'pg',
    debug: env.dev.dbDebug,
    asyncStackTrace: env.dev.dbDebug,
    version: '7.11.0',
    connection: {
      host: env.dev.dbHost,
      user: env.dev.dbUser,
      password: env.dev.dbPass,
      database: env.dev.dbName,
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'shuttlego',
      user:     'postgres',
      password: '1234'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
