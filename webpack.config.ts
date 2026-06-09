import path from "node:path";
import { fileURLToPath } from "url";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: webpack.Configuration = {
  entry: "./src/index.ts",
  "mode": "production",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".web.ts", ".web.js", ".ts", ".js"],
  },
  // TODO: We should be able to turn this off, but it breaks
  // compilation right now.
  optimization: {
    minimize: false,
  },
  output: {
    library: {
      name: "xjslt",
      type: "window",
    },
    filename: "xjslt-web.js",
    path: path.resolve(__dirname, "dist"),
  },
};

export default config;
