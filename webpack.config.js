const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//------------------------------------------------------------------------
// получить переменную командной строки
const arg=(name)=>process.argv.find((a) => ((a === name) || (a === (`--${name}`)))) !== undefined;
//------------------------------------------------------------------------
// генерация ключа (для CSS)
const genHash=(count)=>{
    let res = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < count; i++) res += possible.charAt(Math.floor(Math.random() * possible.length));
    return res;
}
//------------------------------------------------------------------------
let  mode = arg('prod') ?'production':'development';



let outputPath = path.resolve(__dirname,'dist');
let hash = genHash(20);


const copyList = [
    { from: `./app/media/favicon.ico` },
];



module.exports = {
    entry:{
        main:'./app/index.js',
    }, 
    output:{
        path:outputPath,
        filename:'[name].[fullhash].js',
    },
    resolve: {
        alias: {
        },
    },
    mode,
    devtool: (mode === 'development'  ? 'inline-source-map' : undefined),
    plugins: [
        new webpack.DefinePlugin({
           WEBPACK_MODE:JSON.stringify(mode),
        }),        
        new HtmlWebPackPlugin({
            template: `./app/index.html`,
            filename: './index.html',
        }),
        new CopyWebpackPlugin({patterns:copyList}),
        //new webpack.HotModuleReplace`mentPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    optimization: {
        minimizer:(mode==='production')?[
          // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
          `...`,
          //new CssMinimizerPlugin(),
          
        ]:[],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port:3000,
        //liveReload: true,
    },
        

};