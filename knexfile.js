module.exports = {

  development: {
    client: 'pg',
    version: '7.11.0',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '1234',
      database: 'shuttlego',
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
