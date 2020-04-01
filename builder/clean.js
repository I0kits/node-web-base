const del = require('del');
const path = require('path');

const config = require('./common');

const items = [
  path.join(config.base, 'node_modules'),
  path.join(config.base, `*${config.suffix}`),
];

items.forEach((item, idx)=> {
  console.log(`[${idx}] Deleting ${item}`);
  del.sync(item);
});
