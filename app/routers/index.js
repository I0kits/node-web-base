import express from 'express';

import login from './apis/login';
import authors from './apis/authors';
import questions from './apis/questions';

const router = express.Router();
router.use(express.json({ limit: '512kb' }));

login.mount(router);
authors.mount(router);
questions.mount(router);

export default router;
