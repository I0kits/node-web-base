require('dotenv').config();

const path = require('path');

module.exports = {
  base: path.resolve(__dirname, '..'),
  port: process.env.SERVER_PORT || 7001,
  secret: process.env.SECRET || 'YOUR_SECRET_CODE',
  moment_tz: process.env.MOMENT_TZ || 'Asia/Shanghai',
  database_uri: process.env.DATABASE_URI || 'sqlite::memory:',

  dd_app_key: process.env.DD_APP_KEY || 'YOUR APP KEY',
  dd_app_secret: process.env.DD_APP_SECRET || 'YOUR APP SECRET',
  dd_api_url_base: process.env.DD_API_URL_BASE || 'https://oapi.dingtalk.com',

  isProd: process.env.NODE_ENV === 'production',
};
