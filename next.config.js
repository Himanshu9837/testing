const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const withTM = require("next-transpile-modules");
module.exports = {
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },



}
module.exports = {
  plugins: {
    autoprefixer: {},
  },
}
module.exports = { trailingSlash: true, }

module.exports = {
  basePath: '/public/static/images',
}

module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on fs module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}

module.exports = {
  /* ... */
  webpack(config) {
    config.plugins = config.plugins.filter(plugin => {
      return plugin.constructor.name !== 'ReactFreshWebpackPlugin';
    });

    return config;
  },
};

module.exports = {
  target: 'serverless',
  webpack: function (config) {
    config.module.rules.push({ test: /\.md$/, use: 'raw-loader' })
    config.module.rules.push({ test: /\.yml$/, use: 'raw-loader' })
    return config
  }
}




module.exports = {
  optimization: {
    runtimeChunk: true
  },
  //...
  output: {
    devtoolModuleFilenameTemplate: info => {
      return `webpack:///${info.resourcePath}?${info.loaders}`;
    }
  }
};

module.exports = {
  images: {
    loader: 'akamai',
    path: '',
  },
}


// module.exports = {
//     eslint: { ignoreDuringBuilds: true },
//     // your other settings here ...
// }

// const withImages = require('next-images')
// module.exports = withImages({
//     webpack(config, options) {
//         return config
//     }
// })
// const withImages = require('next-images')
// module.exports = withImages({
//   fileExtensions: ["jpg", "jpeg", "png", "gif"],
//   webpack(config, options) {
//     return config
//   }
// })
// const withImages = require('next-images')
// module.exports = withImages()

// module.exports = {
//   images: {
//     domains: ['assets.example.com'],
//   },
// }

// const withImages = require('next-images')
// module.exports = withImages({
//   inlineImageLimit: false
// })
// module.exports = {
//     images: {
//         domains: ['media.giphy.com']
//     }
// };
// const withImages = require("next-images");
// const { withPlugins } = require("next-compose-plugins");
//
// const nextConfig = {
//     env: {
//         API_URL: "https://multikart-graphql-dun.vercel.app/server.js",
//     },

    // if you want to run with local graphQl un-comment below one and comment the above code
    // env: {
    //   API_URL: "http://localhost:4000/graphql",
    // },

//     webpack(config, options) {
//         config.module.rules.push({
//             test: /\.svg$/,
//             issuer: {
//                 test: /\.(js|ts)x?$/,
//             },
//             use: ["@svgr/webpack"],
//         });
//         return config;
//     },
// };
//
// module.exports = withPlugins([withImages], nextConfig);
