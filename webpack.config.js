const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseDir = path.join(__dirname, '.');
//const publicKeyFile = 'app/services/jwtRS256.key.pub';

module.exports = (env, argv) => {
  return {
    target: 'node',
    devtool: "source-map",
    externals: [nodeExternals()],
    entry: path.join(baseDir, 'app', 'main.js'),
    node: { __dirname: false, __filename: false },
    output: { path: path.join(baseDir, 'dist', 'app'), filename: 'main.js' },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        { from: path.join(baseDir, 'yarn.lock'), to: path.join(baseDir, 'dist') },
        { from: path.join(baseDir, 'package.json'), to: path.join(baseDir, 'dist') },
        { from: path.join(baseDir, 'public'), to: path.join(baseDir, 'dist', 'public') },
        { from: path.join(baseDir, 'babel.config.json'), to: path.join(baseDir, 'dist') },
      ]),
      new WebpackShellPlugin({
        onBuildEnd: ['yarn run zip'],
        onBuildStart: ['yarn run clean'],
      }),
    ]
  }
};
