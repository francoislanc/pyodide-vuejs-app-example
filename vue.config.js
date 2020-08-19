module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "scikit-learn in a Vue.js App";
      return args;
    });
  }
};
