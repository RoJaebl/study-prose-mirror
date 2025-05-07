import * as path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import env from "environment/env";

// 환경 변수에 따라 CSS 로더 선택
const getStyleLoaders = () => {
  return [
    env.CSS_BUNDLER === "style-loader"
      ? "style-loader"
      : MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        modules: false,
        sourceMap: env.ENABLE_SOURCE_MAP,
        importLoaders: 1,
      },
    },
    {
      loader: "postcss-loader",
      options: {
        sourceMap: env.ENABLE_SOURCE_MAP,
        postcssOptions: {
          config: path.resolve(__dirname, "../style/postcss.config.ts"),
        },
      },
    },
    {
      loader: "sass-loader",
      options: {
        sourceMap: env.ENABLE_SOURCE_MAP,
      },
    },
  ];
};

const config: Configuration = {
  entry: {
    main: ["./src/index.ts", "./src/styles.scss"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: getStyleLoaders(),
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss", ".css"],
    alias: {
      "@": path.resolve(__dirname, "../../src"),
      environment: path.resolve(__dirname, "../../environment"),
      config: path.resolve(__dirname, "../../config"),
    },
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "../../build"),
    clean: true, // 빌드 시 이전 빌드 파일 삭제
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../../src/index.html"),
      publicPath: env.ASSET_PATH,
    }),
    // CSS_BUNDLER가 mini-css-extract일 때만 플러그인 사용
    ...(env.CSS_BUNDLER === "mini-css-extract"
      ? [
          new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css",
            runtime: true,
          }),
        ]
      : []),
  ],
};

export default config;
