import dotenv from 'dotenv'

dotenv.config()

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'postgresql',
    connection: {
      host: process.env.AWS_RDS_ENDPOINT,
      port: process.env.AWS_RDS_PORT,
      user: process.env.AWS_RDS_USER,
      password: process.env.AWS_RDS_PASS,
      database: process.env.AWS_RDS_DATABASE,
      ssl: { rejectUnauthorized: false }, // Required if RDS enforces SSL
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};
