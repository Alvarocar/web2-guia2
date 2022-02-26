import { Sequelize } from 'sequelize/types'
import { getEnv } from '../ultil'

const host = getEnv('DATABASE_HOST')
const database = getEnv('DATABASE_NAME')
const username = getEnv('DATABASE_USERNAME')
const password = getEnv('DATABASE_PASSWORD')
const port = Number(getEnv('DATABASE_PORT'))

export const sequelize = new Sequelize( database, username, password, {
  host,
  port,
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.authenticate()
.then(() => {
  console.log('Connection established with the database ' + database)
}).catch(err => console.error('Unable to connect to the database:', err))