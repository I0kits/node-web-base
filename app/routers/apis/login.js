import bodyParser from 'body-parser';

import auth from '../auth';
import authenticator from '../../services/authenticator';

const check = (req, res, next) => {
  res.json({success: true, user: req.user}).end();
};

const login = (req, res, next) => {
  const {account, password} = req.body;
  authenticator.auth(account, password)
    .then(user => res.json({success: true, user}).end())
    .catch(next)
};

export default {
  mount: (router) => {
    router.get('/check', auth.required, check);
    router.post('/login', bodyParser.json(), auth.optional, login);
  }
}
