const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:  {
        index:path.join(__dirname, 'src/luckfine/page/index.js'),
        activity:path.join(__dirname, 'src/luckfine/page/activity.js')
    },
    mode:'develop',
    output: {
        filename: './[name].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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
          server: path.resolve(__dirname + '/src/server/'),
          '@': path.resolve('src')
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:`./src/luckfine/index.html`,
            filename:'index.html',
            chunks:['index'],
            inject: 'true'
        }),
        new HtmlWebpackPlugin({
            template:`./src/luckfine/index.html`,
            filename:'activity.html',
            chunks:['activity'],
            inject: 'true'
        }),
        new VueLoaderPlugin()
    ],
    devServer: {
        proxy:{
            '/actconf/api': {
                target: '0.0.0.0:4000'
            }
        }
    }
}