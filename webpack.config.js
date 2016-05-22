// http://humaan.com/getting-started-with-webpack-and-react-es6-style/
var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path'),
    webpack = require('webpack'),
    isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './front/index.jsx',
    output: {
        path: path.resolve(__dirname + '/dist'),
        publicPath: '/',
        filename: '/bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: getJsLoaders()
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(['css', 'postcss-loader'])
            }
        ]
    },
    postcss: function () {
        return [require('autoprefixer')];
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components']
    },
    plugins: getPlugins(),
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    }
};

function getJsLoaders() {
    var loaders = ['babel'];
    if (!isProd) {
        // loaders.unshift('react-hot');
    }
    return loaders;
}

function getPlugins() {
    var plugins = [
        // for stateless component so we do not need to import React manualy
        new webpack.ProvidePlugin({
             React: 'react'
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ),
        new ExtractTextPlugin('/bundle.css', {
            allChunks: true
        })
    ];

    if (isProd) {
        plugins = plugins.concat([
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true
                },
                comments: false,
                sourceMap: false
            })
        ]);
    } else {
        // plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return plugins;
}
