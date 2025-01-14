import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'backend/database/database.sqlite'
})

export default sequelize
