import auth from '../auth';
import Passport from '../../services/passport';
import authenticator from '../../services/authenticator';

const check = (req, res, next) => {
  const token = auth.token(req);

  authenticator.verify(token, req.user)
    .then(data => res.json({success: true, data}).end())
    .catch(next);
};

const logged = (req, res, next) => {
  authenticator.sign(req.user)
    .then(data => res.json({success: true, data}).end())
    .catch(next)
};

export default {
  mount: (router) => {
    router.get('/check', auth.required, check);
    router.post('/login',Passport.login('local'), logged);
  }
}
