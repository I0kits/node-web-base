import passport from 'passport';

import LocalStrategy from './local';

export default {
  free: () => {
    console.log('The Passport been destroy.');
  },
  init: () => {
    passport.use(LocalStrategy.create());
  },
  login: (type) => {
    return passport.authenticate(type, {session: false})
  }
}
