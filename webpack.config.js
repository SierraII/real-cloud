const path = require('path');

var config = {

   entry: './src/webapp/base/main.js',

   output: {
        path: path.resolve(__dirname, './src/webapp/build/'),
        filename: 'main.bundle.js'
    },

   devServer: {
      inline: true,
      port: 8080,
      contentBase: "./src/webapp/",
      historyApiFallback: true,
   },

   resolveLoader: {
       moduleExtensions: ['-loader']
    },

   module: {

      loaders: [{

            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',

            query: {
               presets: ['es2015', 'react', 'react-hmre']
           }

       }]

   }
}

module.exports = config;
