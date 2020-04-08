import path from 'path';
import http from 'http';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import compression from 'compression';
import errorhandler from 'errorhandler';
import {createTerminus} from '@godaddy/terminus';

import conf from './config'
import Apis from './routers/index';
import Models from './models/index';

const databaseRelease = Models.init();

const app = express();
app.use(cors());
app.use(compression());

if (!conf.isProd) {
  app.use(errorhandler());
}

//Apis.mount('/api', app, express.Router());
app.use('/api', Apis);
app.use(express.static(path.resolve(__dirname, '..', 'public')));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (!conf.isProd) {
    console.log(err.stack); // Is in development will print stacktrace
  }

  res.status(err.status || 500);
  res.json({
    success: false,
    errorCode: res.status,
    errorMessage: err.message,
    errorStack: conf.isProd ? null : err.stack, // Is in production no stacktrace leaked to user
  });
});

const server = createTerminus(http.createServer(app), {
  timeout: 3000,
  logger: console.log,
  signals: ['SIGINT', 'SIGTERM'],
  onSignal: ()=> {
    databaseRelease();
  }
});

const mode = conf.isProd ? 'Production' : 'Development';
server.listen(conf.port, () => console.log(`Listening on port ${conf.port} in ${mode} mode.`));

process.on('unhandledRejection', console.error);
