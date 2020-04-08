import auth from '../auth';
import pageable from '../pageable';

import {Author} from '../../models/author';
import {Account} from "../../models/account";

const list = (req, res, next) => {
  const query = {limit: req.query.limit, offset: req.offset};

  const send = data => res.json({success: true, data}).end();
  Author.findAndCountAll(query).then(send).catch(next);
};

const create = (req, res, next) => {
  const {account, password, name, description} = req.body;

  const author = Author.build({name, description});
  Promise.all([author.save(), author.setAccount(Account.build({account, password}))])
    .then(data=> res.json({success: true, data}).end())
    .catch(next);
};


export default {
  mount: (router) => {
    router.post('/authors', auth.optional, create);
    router.get('/authors', auth.required, pageable.paging, list);
  }
}
