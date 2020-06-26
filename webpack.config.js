const path = require('path');

module.exports = function(env, argv) {
  return {
    entry: './src/index.js',
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-maps' : 'eval',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist/build/'),
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
    }
  };
};
