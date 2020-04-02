import path from 'path';

require('dotenv').config();

export default {
  base: path.resolve(__dirname, '..'),
  port: process.env.SERVER_PORT || 7001,
  secret: process.env.SECRET || 'YOUR_SECRET_CODE',
  moment_tz: process.env.MOMENT_TZ || 'Asia/Shanghai',
};
