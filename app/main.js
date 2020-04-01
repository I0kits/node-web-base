import path from 'path';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import errorhandler from 'errorhandler';

import Apis from './apis/index';

const isProd = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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
      error: isProd ? {} : err // Is in production no stacktrace leaked to user
    }
  });
});

const port = process.env.PORT || 7000;
const mode = isProd ? 'production' : 'development';
app.listen(port, () => console.log(`Listening on port ${port} in ${mode} mode.`));
