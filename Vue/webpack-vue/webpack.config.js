const path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath:'dist/'
    },
    module:{
        rules: [
            {
              test: /\.css$/i,
              use: ['style-loader', "css-loader"],
            },
            {
              test: /\.(png|jpg|gif)$/i,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8000 
                  }
                }
              ]
            },
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['es2015']
                }
              }
            },
            {
              test: /\.vue$/,
              use: ['vue-loader'],
            }
          ],
    },
    resolve:{
      alias:{
        'vue$':'vue/dist/vue.esm.js'
      }
    }
}