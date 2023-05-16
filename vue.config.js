const { defineConfig } = require("@vue/cli-service");

let proxyObj = {};
const CompressionPlugin = require("compression-webpack-plugin");

proxyObj["/"] = {
  ws: false,
  target: "http://localhost:9911",
  changeOrigin: true,
  pathRewrite: {
    "^/": "",
  },
};

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "localhost",
    port: 8080,
    proxy: proxyObj,
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 1024,
            deleteOriginalAssets: false,
          }),
        ],
      };
    }
  },
});
