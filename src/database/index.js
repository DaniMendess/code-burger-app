import Sequelize from 'sequelize'

import Product from '../app/models/Product'
import User from '../app/models/User'

import ConfigDataBase from '../config/database'

const models = [User, Product]

class DataBase {
  constructor () {
    this.init()
  }

  init () {
    this.connection = new Sequelize(ConfigDataBase)
    models.map(model => model.init(this.connection))
  }
}

export default new DataBase()
