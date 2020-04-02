import md5 from 'md5';
import _ from 'lodash';
import jwt from 'jsonwebtoken';

import conf from '../config';

const accounts = {
  // admin-123
  '8af0ce0e22fa0d2c0c48ff69165e4075': {
    name: '管理员',
    icon: 'a picture',
    role: 'ADMIN',
  },
  // guest-456
  '147f07283f6521f31106834cb341b736': {
    name: '访客',
    icon: 'a picture',
    role: 'GUEST',
  },
};

const jwtSign = (data) => {
  const now = Date.now() / 1000;
  const iat = Math.floor(now);
  const exp = Math.floor(now) + (60 * 60); //1 hour

  const payload = {iat, exp, ...data};
  payload.token = jwt.sign(payload, conf.secret);

  return payload;
};

export default {
  auth: async (account, password) => {
    const key = md5(`${account}-${password}`);

    const user = accounts[key];

    if (_.isNil(user)) {
      throw new Error('invalid account or password!');
    }

    return jwtSign(user);
  }
}
