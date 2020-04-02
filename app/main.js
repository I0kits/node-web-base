import path from 'path';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import errorhandler from 'errorhandler';

import conf from './config'
import Apis from './routers/index';

const isProd = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());

if (!isProd) {
  app.use(errorhandler());
}

Apis.mount('/api', app, express.Router());
app.use(express.static(path.resolve(__dirname, '..', 'public')));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use((err, req, res, next) => {
  if (!isProd) {
    console.log(err.stack); // Is in development will print stacktrace
  }

  res.status(err.status || 500);
  res.json({
    'errors': {
      message: err.message,
      error: isProd ? null : err.stack // Is in production no stacktrace leaked to user
    }
  });
});

const mode = isProd ? 'production' : 'development';
app.listen(conf.port, () => console.log(`Listening on port ${conf.port} in ${mode} mode.`));
