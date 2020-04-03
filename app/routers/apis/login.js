import bodyParser from 'body-parser';

import auth from '../auth';
import authenticator from '../../services/authenticator';

const check = (req, res, next) => {
  const token = auth.token(req);

  authenticator.verify(token, req.user)
    .then(data => res.json({success: true, data}).end())
    .catch(next);
};

const login = (req, res, next) => {
  const {account, password} = req.body;

  authenticator.auth(account, password)
    .then(data => res.json({success: true, data}).end())
    .catch(next)
};

export default {
  mount: (router) => {
    router.get('/check', auth.required, check);
    router.post('/login', bodyParser.json(), auth.optional, login);
  }
}
