const Sequelize = require('sequelize');

class Account extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      password: {type: DataTypes.STRING(100), allowNull: false},
      account: {type: DataTypes.STRING(100), allowNull: false, unique: true},
    }, {sequelize});
  }
}

module.exports = {
  Account,
  default: (sequelize, DataTypes) => Account.init(sequelize, DataTypes),
};
