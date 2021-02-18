const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/client/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/, /static/]
            },
            {
                test: /.s?[ca]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: './src/client/views/index.html' }),
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: 'saved-places'
        }),
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: 'best-places'
        }),
        new MiniCssExtractPlugin({ filename: '[name].css' }),
        new CopyPlugin({
            patterns: [{ from: 'src/client/static', to: '' }]
        })
    ],
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            `...`,
            new CssMinimizerPlugin()
        ]
    },
    output: {
        publicPath: '',
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}
