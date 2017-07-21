const path = require('path');

var config = {

   entry: './src/webapp/base/Core.js',

   output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'core.bundle.js'
    },

   devServer: {
      inline: true,
      port: 8080
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
