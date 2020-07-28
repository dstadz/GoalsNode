// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: { filename: './data/users.db3' },
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'd9htg4mc64lo4u',
      user:     'tmetmpuzmbcdwv',
      password: 'ee8a7825288114cfbe98111e276028e0add783d35dcacf93c3ea0fc532cd6d15'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: { tableName: 'knex_migrations' }
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
    migrations: { tableName: 'knex_migrations' }
  }
};
