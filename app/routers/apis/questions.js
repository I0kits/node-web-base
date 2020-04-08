import _ from 'lodash';
import auth from "../auth";
import pageable from "../pageable";

import {Author} from '../../models/author';
import {Question} from '../../models/question';

const throwError = (msg, code) => {
  const err = new Error(msg);
  err.status = code;
  throw err;
};

const sender = (data, res)=> {
  res.json({success: true, data}).end();
};

const create = (req, res, next) => {
  const {author_id} = req.body;
  if (!_.isNumber(author_id)) {
    return throwError('invalid author id.', 400)
  }

  const createQuestion = (author) => {
    if (_.isNull(author)) {
      return throwError('unknown author id.', 400);
    }

    const {title, subtitle, content} = req.body;
    const processFn = (data) => author.addQuestion(data).then(()=> sender(data, res));

    Question.create({title, subtitle, content}).then(processFn).catch(next);
  };

  Author.findByPk(author_id).then(createQuestion).catch(next);
};

const list = (req, res, next) => {
  const query = {limit: req.query.limit, offset: req.offset};

  // TODO: 关联 author 数据：author's name.
  // TODO: 不需要content 数据
  // TODO: 处理DATE timezone and format

  Question.findAndCountAll(query).then((data)=> sender(data, res)).catch(next);
};

const detail = (req, res, next) => {
  const id = req.params.id;
  if (_.isEmpty(_.trim(id))) {
    return throwError('invalid question id.', 400);
  }

  Question.findByPk(id).then((d)=> sender(d, res)).catch(next);
};

export default {
  mount: (router) => {
    router.post('/questions', auth.required, create);
    router.get('/questions/:id', auth.required, detail);
    router.get('/questions', auth.required, pageable.paging, list);
  }
}
