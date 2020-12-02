import LocalStrategy from 'passport-local';

import {Author} from '../../models/author';
import {Account} from '../../models/account';

const opts = {
  usernameField: 'account', passwordField: 'password'
};

const checkPassword = (usr, password, done) => {
  if (usr === null) {
    return done(null, false, 'invalid account!');
  }

  if (!usr.checkPassword(password)) {
    return done(null, false, 'invalid account or password!');
  }

  const authorId = usr.getDataValue('AuthorId');
  const queryOpts = {attributes: ['id', 'avatar', 'name']};

  Author.findByPk(authorId, queryOpts).then(author => {
    const { account, id } = usr.dataValues;
    const { name, avatar } = author.dataValues;
    return done(null, { id, account, name, avatar, role: 'TODO', author: author.id });
  }).catch(console.error);
};

const handleError = (err, done) => {
  console.error(err);
  return done(null, false, err.message);
};

const checker = () => {
  return (account, password, done) => {
    const query = {where: {account}, attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}};
    Account.findOne(query).then(usr => checkPassword(usr, password, done)).catch(err => handleError(err, done));
  }
};

export default {
  create: () => {
    return new LocalStrategy(opts, checker());
  }
}
