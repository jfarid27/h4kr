const path = require('path');
const webpack = require('webpack');

module.exports = function(env, argv) {
  const _env = env || {};
  return {
    entry: './src/index.js',
    mode: _env.production ? 'production' : 'development',
    devtool: _env.production ? 'source-maps' : 'eval',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "env.MODE": _env.production ? '"production"' : '"development"'
      })
    ]
  };
};
