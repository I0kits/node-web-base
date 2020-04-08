import Sequelize from 'sequelize';

export class Author extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      avatar: {type: DataTypes.STRING(100)},
      name: {type: DataTypes.STRING(100), allowNull: false, unique: true},
      description: {type: DataTypes.TEXT},
    }, {sequelize});
  }

  static associate(sequelize) {
    this.hasOne(sequelize.models.Account);
    this.hasMany(sequelize.models.Question);
  }
}

export default (sequelize, DataTypes) => Author.init(sequelize, DataTypes);
