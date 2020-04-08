import _ from 'lodash';
import auth from "../auth";
import pageable from "../pageable";

import {Author} from '../../models/author';
import {Question} from '../../models/question';

const create = (req, res, next) => {
  const throwError = (msg) => {
    const err = new Error(msg)
    err.status = 400;
    throw err;
  };

  const {author_id} = req.body;
  if (!_.isNumber(author_id)) {
    return throwError('invalid author id.')
  }

  const createQuestion = (author) => {
    if (_.isNull(author)) {
      return throwError('unknown author id.');
    }

    const {title, subtitle, content} = req.body;
    Question.create({title, subtitle, content})
      .then(data => res.json({success: true, data}).end())
      .catch(next)
  };

  Author.findByPk(author_id).then(createQuestion).catch(next);
};

const list = (req, res, next) => {
  const query = {limit: req.query.limit, offset: req.offset};

  // TODO: 关联 author 数据：author's name.
  // TODO: 不需要content 数据

  const send = data => res.json({success: true, data}).end();
  Question.findAndCountAll(query).then(send).catch(next);
};

export default {
  mount: (router) => {
    router.post('/questions', auth.required, create);
    router.get('/questions', auth.required, pageable.paging, list);
  }
}
