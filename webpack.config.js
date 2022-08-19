module.exports = {
    devServer: {
        contentBase: './app',
        compress: true,

        proxy: {
            '/graphql': {
                target: 'http://178.62.228.242:3010/',
                secure: false,
            },
        },
    },
    optimization: { namedModules: true, runtimeChunk: true, namedChunks: true, splitChunks: { cacheGroups: { default: false } } },
};

module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  };