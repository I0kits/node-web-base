const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const modelsExternals = () => {
  return (context, request, callback) => {
    const matched = /\/models\/(.)+/.exec(request);
    return matched
      ? callback(null, `commonjs .${matched[0]}`)
      : callback();
  }
};

const configExternals = () => {
  return (context, request, callback) => {
    const matched = /\/config/.exec(request);
    return matched
      ? callback(null, `commonjs .${matched[0]}`)
      : callback();
  }
};

const baseDir = path.join(__dirname, '.');

module.exports = (env, argv) => {
  return {
    target: 'node',
    devtool: 'source-map',
    entry: path.join(baseDir, 'app', 'main.js'),
    node: {__dirname: false, __filename: false, global: false},
    externals: [nodeExternals(), modelsExternals(), configExternals()],
    output: {path: path.join(baseDir, 'dist', 'app'), filename: 'main.js'},
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        {from: path.join(baseDir, 'conf'), to: path.join(baseDir, 'dist/conf')},
        {from: path.join(baseDir, 'www'), to: path.join(baseDir, 'dist', 'www')},
        {from: path.join(baseDir, 'package.json'), to: path.join(baseDir, 'dist')},
        {from: path.join(baseDir, 'public'), to: path.join(baseDir, 'dist', 'public')},
        {from: path.join(baseDir, 'babel.config.json'), to: path.join(baseDir, 'dist')},
        {from: path.join(baseDir, 'app/models'), to: path.join(baseDir, 'dist/app/models')},
        {from: path.join(baseDir, 'app/config.js'), to: path.join(baseDir, 'dist/app/config.js')},
        {from: path.join(baseDir, '.env.test'), to: path.join(baseDir, 'dist/.env'), toType: 'file'},
      ]),
      new WebpackShellPlugin({
        onBuildStart: ['yarn run clean'],
        onBuildEnd: ['yarn run zip'],
      }),
    ]
  }
};
