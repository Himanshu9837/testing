module.exports = {
    entry: {
        "app": "./pages/_app.js"
    },
    output: {
        path: path.resolve(__dirname, 'wwwroot/dist'),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js"
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: "awesome-typescript-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(css|less)?$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader?modules&localIdentName=[local]--[hash:base64:5]"
                }, {
                    loader: "less-loader"
                }]
            },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".less"]
    }
};