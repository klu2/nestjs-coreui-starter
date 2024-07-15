const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        clipboard: './src-client/js/clipboard.js',
        tooltip: './src-client/js/tooltip.js',
        colormodes: './src-client/js/color-modes.js',
    },
    output: {
        filename: '[name].min.js',
        path: __dirname + '/dist/js',
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                include: /photoswipe/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};
