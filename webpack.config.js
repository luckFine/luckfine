const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:  path.join(__dirname, 'src/luckfine/page/index.js'),
    mode:'develop',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve: {
        extensions: [
          '.vue', '.js'
        ],
        modules: ["node_modules"],
        alias: {
          vue: 'vue/dist/vue.min.js',
          components: path.resolve(__dirname + '/src/components/'),
          stores: path.resolve(__dirname + '/src/stores/'),
          '@': path.resolve('src')
        }
    },
    plugins:[
        new HtmlWebpackPlugin(),
        new VueLoaderPlugin()
    ]
    // devServer: {
    //     historyApiFallback: {
    //       index: `/dist/h5/index.html`
    //     },
    //     host: '0.0.0.0',
    //     disableHostCheck: true
    // }
}