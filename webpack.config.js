const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseDir = path.join(__dirname, '.');
//const publicKeyFile = 'app/services/jwtRS256.key.pub';

module.exports = (env, argv) => {
  return {
    target: 'node',
    devtool: "source-map",
    externals: [nodeExternals()],
    entry: path.join(baseDir, 'app', 'main.js'),
    node: { __dirname: false, __filename: false },
    output: { path: path.join(baseDir, 'dist'), filename: 'app.js' },
    plugins: [
      new CopyWebpackPlugin([
        { from: path.join(baseDir, 'package.json'), to: path.join(baseDir, 'dist') },
        { from: path.join(baseDir, 'public'), to: path.join(baseDir, 'dist', 'public') },
        { from: path.join(baseDir, 'babel.config.json'), to: path.join(baseDir, 'dist') },
      ])
    ]
  }
};
