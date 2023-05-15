const Dotenv = require("dotenv-webpack");

module.exports = {
  env: {
    GRAPHQL_API_URL: process.env.GRAPHQL_API_URL,
    ASSETS_PATH_PATTERN: "http://labrys.local/app/foobar",

    ASSETS_PATH_REPLACEMENT: "/assets",
  },
  eslint: {
    // Temporary fix to render-blocking typekit script (adding 'async' causes FOUT)
    ignoreDuringBuilds: true,
  },
  webpack: (config, { dev, isServer }) => {
    config.plugins.push(new Dotenv());

    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }
    if (!isServer) {
      // Unset client-side javascript that only works server-side
      // https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
      config.node = { fs: "empty", module: "empty" };
    }

    return config;
  },
};
