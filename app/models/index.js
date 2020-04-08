import path from 'path';
import globby from 'globby';
import Sequelize from 'sequelize';

import conf from '../config';

const loadAllModels = (sequelize) => {
  const files = globby.sync([
    path.posix.join(__dirname, '**/*.js'),
    `!${path.posix.join(__dirname, 'index.js')}`
  ]);

  // load models
  const models = files.map((file, idx) => {
    console.log('[%s].Loading module from:', idx + 1, file);
    return sequelize.import(file);
  });

  // build association
  models.forEach(model => model.associate && model.associate(sequelize));

  if (!conf.isProd) {
    sequelize.sync().then(() => console.log('Database structure ready.')).catch(console.error);
  }
};

export default {
  init: () => {
    const uri = conf.database_uri;
    const sequelize = new Sequelize(uri, {
      //timezone: conf.moment_tz,
      pool: {max: 5, min: 0, acquire: 30000, idle: 10000},
      define: {paranoid: true, underscored: true, charset: 'utf8', version: false},
    });

    sequelize.authenticate()
      .catch(err => console.error('Unable to connect to the database:', err))
      .then(() => {
        console.log('Database connection has been established successfully with:[%s]', uri);

        loadAllModels(sequelize);
      });

    return () => {
      if (sequelize && sequelize.close) {
        sequelize.close();
        console.log('Database connections has been closed.');
      }
    };
  }
}
