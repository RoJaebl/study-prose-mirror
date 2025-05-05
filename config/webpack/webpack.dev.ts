import { merge } from "webpack-merge";
import { Configuration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import common from "./webpack.common";

interface WebpackConfiguration extends Configuration {
  devServer?: DevServerConfiguration;
}

const config: WebpackConfiguration = merge(common, {
  devServer: {
    hot: true,
    liveReload: true,
    watchFiles: ['src/**/*'],
  },
  mode: "development",
  devtool: "inline-source-map",
});

export default config;
