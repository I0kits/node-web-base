const Sequelize = require('sequelize');

class Question extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      subtitle: {allowNull: false, type: DataTypes.STRING(255)},
      title: {allowNull: false, type: DataTypes.STRING(100), unique: true},

      content: {type: DataTypes.TEXT},
    }, {sequelize});
  }
}

module.exports = {
  Question,
  default: (sequelize, DataTypes) => Question.init(sequelize, DataTypes),
};
