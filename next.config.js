const webpack = require("webpack");
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },
  module: {
    loaders: [
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.woff|\.woff2|\.svg|.eot|\.ttf|\.png/,
        loader: "url?prefix=font/&limit=10000&name=/assets/fonts/[name].[ext]",
      },
    ],
  },
  mocha: {
    enableTimeouts: false,
    before_timeout: 320000,
  },
  webpack5: true,
  images: {
    domains: ["res.cloudinary.com", "lorempixel.com"],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    STRAPI_LOCAL_BASE_URL: process.env.STRAPI_LOCAL_BASE_URL,
    HEROKU_BASE_URL: process.env.HEROKU_BASE_URL,
    HEROKU_BASE_TNC: process.env.HEROKU_BASE_TNC,
    RINKEBY_API_KEY: process.env.RINKEBY_API_KEY,
    ALCHEMY_KEY: process.env.ALCHEMY_KEY,
    RINKEBY_NODE_URL: process.env.RINKEBY_NODE_URL,
    RINKEBY_NODE_URL_WSS: process.env.RINKEBY_NODE_URL_WSS,
    INFURA_KEY: process.env.INFURA_KEY,
    INFURA_NODE_URL: process.INFURA_NODE_URL,
    METAMASK_MNEMONIC: process.env.METAMASK_MNEMONIC,
    OWNER_ADDRESS: process.env.OWNER_ADDRESS,
    RINKEBY_PROXY_ADDRESS: process.env.RINKEBY_PROXY_ADDRESS,
    MAIN_NET_PROXY_ADDRESS: process.env.MAIN_NET_PROXY_ADDRESS,
    EXTERNAL_LINK: process.env.EXTERNAL_LINK,
    ONBOARD_API_KEY: process.env.ONBOARD_API_KEY,
    NETWORK_ID: process.env.NETWORK_ID,
    COLLECTION_SUFFIX: process.env.COLLECTION_SUFFIX,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_SECRET_KEY: process.env.PINATA_SECRET_KEY,
    PINTA_JWT: process.env.PINTA_JWT,
    REF_ADDRESS: process.env.REF_ADDRESS,
    NETWORK_NAME: process.env.NETWORK_NAME,
  },
};
