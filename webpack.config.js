const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/* Default Config */
let defaultConfig = {
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'images',
                    },
                },
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
        ],
    },
};

let devConfig = {
    ...defaultConfig,
    mode: 'development',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js',
    },
    module: {
        rules: [
            ...defaultConfig.module.rules,
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        port: 3000,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
        }),
    ],
};

let prodConfig = {
    ...defaultConfig,
    mode: 'production',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.[contenthash].js',
        clean: true,
    },
    module: {
        rules: [
            ...defaultConfig.module.rules,
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src', 'index.html'),
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                },
            }),
        ],
    },
};

module.exports = (env, args) => {
    const { prod } = env;
    return prod ? prodConfig : devConfig;
};
