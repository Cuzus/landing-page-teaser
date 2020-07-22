const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AutoPrefixer = require('autoprefixer');
const PostCSSDiscardComments = require('postcss-discard-comments');

const BUILD_DIR = path.join(__dirname, 'build');
const SOURCE_DIR = path.join(__dirname, 'src');

const config = {
    entry: {
        'style': path.join(SOURCE_DIR, 'sass/style.scss')
    },
    output: {
        path: path.resolve(process.cwd(), BUILD_DIR),
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { url: false }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                AutoPrefixer(),
                                PostCSSDiscardComments({
                                    removeAll: true
                                })
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(ico|png|woff|woff2|eot|ttf|otf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].css'
        }),
        new HtmlWebpackPlugin({
            template: path.join(SOURCE_DIR, 'index.html'),
            filename: path.join(BUILD_DIR, 'index.html'),
            inject: false
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(SOURCE_DIR, 'index-ru.html'),
                to: path.join(BUILD_DIR, 'index-ru.html'),
                flatten: true
            },
            {
                from: path.join(SOURCE_DIR, 'fonts/*'),
                to: path.join(BUILD_DIR, 'assets/fonts'),
                flatten: true
            },
            {
                from: path.join(SOURCE_DIR, 'images/*'),
                to: path.join(BUILD_DIR, 'assets/images'),
                flatten: true
            },
        ]),
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    devtool: false
};

module.exports = config;