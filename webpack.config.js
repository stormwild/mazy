const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './js/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [{ 
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: "babel-loader" 
        }, 
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            })
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: {
               loader: 'file-loader',
               options: {
                   name: 'img/[name].[ext]', // check the path
               }
            }
        }, 
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            title: 'Mazy - Simple Js Maze', 
            filename: '../index.html', 
            template: 'html/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'css/style.css'
        }),
        new webpack.ProvidePlugin({
          jQuery: 'jquery',
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          Tether: 'tether'
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'commons',
          filename: 'js/[name].js',
          minChunks: 2,
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ],
    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules']
    },
};

module.exports = config;
