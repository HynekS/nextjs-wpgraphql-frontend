const Dotenv = require("dotenv-webpack");

module.exports = {
  env: {
    GRAPHQL_API_URL: process.env.GRAPHQL_API_URL,
    ASSETS_PATH_PATTERN: "http://(labrys.local/app|labrys.cz/wp-content)",
    ASSETS_PATH_REPLACEMENT: "/assets",
  },
  eslint: {
    // Temporary fix to render-blocking typekit script (adding 'async' causes FOUT)
    ignoreDuringBuilds: true,
  },

  webpack: (config) => {
    config.plugins.push(new Dotenv());

    return config;
  },
};
