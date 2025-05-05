import { merge } from "webpack-merge";
import { Configuration } from "webpack";
import common from "./webpack.common";

const config: Configuration = merge(common, {
  mode: "production",
  devtool: "source-map",
});

export default config;
