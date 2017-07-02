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
        publicPath: '/dist',
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
          jquery: 'jquery'
        })
    ]
};

module.exports = config;
