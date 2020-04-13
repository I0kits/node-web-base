const md5 = require('md5');
const Sequelize = require('sequelize');
const {Account} = require('./account');


class Author extends Sequelize.Model {
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

  static createNewAuthorAndAccount(dat) {
    const password = md5(dat.password);
    const {account, name, description} = dat;

    // TODO: check exists? for author name and account

    return this.sequelize.transaction(transaction => {
      const newAccount = author => author.setAccount(Account.build({account, password}), {transaction});
      const returnDate = () => Promise.resolve({name, account});
      return Author.create({name, description}, {transaction}).then(newAccount).then(returnDate);
    });
  }
}

module.exports = {
  Author,
  default: (sequelize, DataTypes) => Author.init(sequelize, DataTypes),
};
