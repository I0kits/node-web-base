import Sequelize from 'sequelize';

export class Account extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      password: {type: DataTypes.STRING(100), allowNull: false},
      account: {type: DataTypes.STRING(100), allowNull: false, unique: true},
    }, {sequelize});
  }
}

export default (sequelize, DataTypes) => Account.init(sequelize, DataTypes);
