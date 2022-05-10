module.exports = {
  lintOnSave: false,
  publicPath: './',
  chainWebpack: config => {
    // 里面设置的东西打包会被排除在外
    config.set('externals', {
      vue: 'Vue',
       'element-ui': 'ElEMENT',
      //'element-ui': 'ElementUI'
    })
  }
}
