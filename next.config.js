const Dotenv = require("dotenv-webpack");

module.exports = {
  env: {
    GRAPHQL_API_URL: process.env.GRAPHQL_API_URL,
    ASSETS_PATH_PATTERN: "http://labrys.local/app",
    ASSETS_PATH_REPLACEMENT: "/assets",
  },
  eslint: {
    // Temporary fix to render-blocking typekit script (adding 'async' causes FOUT)
    ignoreDuringBuilds: true,
  },

  webpack: (config, { dev, isServer }) => {
    config.plugins.push(new Dotenv());
    /*
    Breaks production build (it's hanging), have do be disabled :(
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }*/

    return config;
  },
};
