import jwt from 'jsonwebtoken';

import conf from '../config';

const jwtSign = (data) => {
  const now = Date.now() / 1000;
  const iat = Math.floor(now);
  const exp = Math.floor(now) + (5 * 60); //5 min
  const payload = {...data, iat, exp};

  payload.token = jwt.sign(payload, conf.secret);
  return payload;
};

export default {
  sign: async (user) => jwtSign(user),
  verify: async (token, dat) => {
    try {
      const payload = jwt.verify(token, conf.secret);
      return jwtSign(payload);
    } catch (err) {
      console.log('verify token error:', err);
      err.status = 400;
      throw err;
    }
  }
}
