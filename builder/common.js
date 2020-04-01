const path = require('path');

const pad = (n) => n < 10 ? `0${n}` : n;

const timestamp = () => {
  const time = new Date();
  const year = time.getFullYear();
  const month = pad(time.getMonth() + 1);
  const day = pad(time.getDate());
  const hour = pad(time.getHours());
  const min = pad(time.getMinutes());
  const sec = pad(time.getSeconds());
  return `${year}${month}${day}${hour}${min}${sec}`
};

const suffix = '.tgz';

module.exports = {
  suffix: suffix,
  output: `${timestamp()}${suffix}`,
  base: path.resolve(__dirname, '..', 'dist')
};
