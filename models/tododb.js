'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tododb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tododb.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    todo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tododb',
  });
  return tododb;
};