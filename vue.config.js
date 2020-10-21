module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Vue SWAPI"
    }
  },
  publicPath: process.env.NODE_ENV === "production" ? "/vue-swapi/" : "/",
  filenameHashing: false,
  productionSourceMap: false
};
