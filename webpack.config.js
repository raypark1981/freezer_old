//https://medium.com/dailyjs/building-a-react-component-with-webpack-publish-to-npm-deploy-to-github-guide-6927f60b3220
//https://webpack.js.org/concepts/loaders/

const path = require('path');

module.exports = [
{
    mode: 'development', //production , development
    entry: {
        "init": './src/dev/init.js',
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'src/bundle/'),
    }
    ,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                  'file-loader',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      bypassOnDebug: true, // webpack@1.x
                      disable: true, // webpack@2.x and newer
                    },
                  },
                ],
            }
        ]
    }
},
{
    mode: 'development', //production , development
    entry: {
        "common": './src/dev/scripts/common.js',
        "freezer": './src/dev/scripts/freezerdb.js',
        "util": './src/dev/scripts/util.js',
        "extension": './src/dev/scripts/extension.js',
        "webviewbridge": './src/dev/scripts/WebViewBridge.js'
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'src/bundle/scripts/'),
        libraryTarget: 'umd',
        library: ["[name]"],
    }
    ,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
        ]
    }
}
]
