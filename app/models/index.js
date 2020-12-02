const _ = require('lodash');
const path = require('path');
const globby = require('globby');
const Sequelize = require('sequelize');

const conf = require('../config');

const loadAllModelsFromFileSys = (sequelize) => {
  const files = globby.sync([
    path.posix.join(__dirname, '**/*.js'),
    `!${path.posix.join(__dirname, 'index.js')}`
  ]);

  // load models by file.
  return files.map((file, idx) => {
    console.log('[%s].Loading module from:', idx + 1, file);
    return sequelize.import(file);
  });
};
const loadAllModelsAndBuildAssociation = (sequelize) => {
  //load all models
  const models = loadAllModelsFromFileSys(sequelize);

  // build association
  models.forEach(model => model.associate && model.associate(sequelize));

  if (!conf.isProd) {
    sequelize.sync().then(() => console.log('Database structure ready.')).catch(console.error);
  }
};

let sequelize;
const free = () => {
  if (sequelize && sequelize.close) {
    sequelize.close();
    sequelize = null;
    console.log('Database connections has been closed.');
  }
};

module.exports = {
  free,
  init: (cb = _.noop) => {
    const uri = conf.database_uri;
    sequelize = new Sequelize(uri, {
      pool: {max: 5, min: 0, acquire: 30000, idle: 10000},
      define: {paranoid: true, underscored: true, charset: 'utf8', version: false},
    });

    const onConnected = () => {
      console.log('Database connection has been established successfully with:[%s]', uri);
      loadAllModelsAndBuildAssociation(sequelize);

      if (_.isFunction(cb)) cb(sequelize.models);
    };

    const onError = (err) => {
      console.error('Unable to connect to the database:', err)
    };

    sequelize.authenticate().then(onConnected).catch(onError);
    return free;
  },
  get: () => {
    return sequelize
  },
  getModels: () => {
    return sequelize.models
  },
};
