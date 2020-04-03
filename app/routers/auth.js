import _ from 'lodash';
import jwt from 'express-jwt';

import conf from '../config';

const secret = conf.secret;
const getToken = (req) => {
  //console.log('Fetch token from HEADER: ' + req.headers.authorization);
  const {authorization} = req.headers;

  if (_.isEmpty(_.trim(authorization))) {
    return null;
  }

  const [name, token] = authorization.split(' ');
  if (name !== 'Bearer') {
    return null;
  }

  return token;
};

export default {
  token: getToken,
  required: jwt({secret, getToken}),
  optional: jwt({secret, getToken, credentialsRequired: false}),
}
