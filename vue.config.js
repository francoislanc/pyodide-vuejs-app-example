module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Pyodide Vue.js App example";
      return args;
    });
  },
  publicPath:
    process.env.NODE_ENV === "production" ? "/pyodide-vuejs-app-example/" : "/",
};
