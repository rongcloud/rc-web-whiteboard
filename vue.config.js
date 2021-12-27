const Timestamp = new Date().getTime();
module.exports = {
  publicPath: '/web',
  outputDir: './web',
  configureWebpack: {
    output: {
      filename: `[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`,
      chunkFilename: `[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`
    }
  },
  devServer: {
    open: true,
    port: 8080,
    hotOnly: false,
    hot: true,
    inline: false,
    liveReload: false,
  },
}
