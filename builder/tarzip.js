const path = require('path');
const jaguar = require('jaguar');

const config = require('./common');

const from = config.base;
const name = config.output;
const to = path.join(from, name);

const pack = jaguar.pack(from, to, [
  'app', 'conf', 'public', 'www',
  '.env', 'babel.config.json', 'package.json'
]);

pack.on('start', () => console.log('Start of packing...'));
pack.on('end', () => console.log(`All files packed to [${name}]`));

pack.on('error', (error) => console.error(error));
