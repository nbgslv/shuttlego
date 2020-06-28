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
    pool: {
      min: 2,
      max: 6,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false, // <- default is true, set to false
    },
    migrations: {
      directory: './src/db/config/migrations',
    },
    seeds: {
      directory: './src/db/config/seeds',
    },
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'shuttlego',
      user: 'postgres',
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
