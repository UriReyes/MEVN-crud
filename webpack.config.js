const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
    entry: './src/app/index.js',
    output: {
        path: path.join(__dirname, '/src/public/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: '/node_modules/',
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.vue$/,
            use: 'vue-loader'
        }]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}