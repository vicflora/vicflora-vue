// use @ to go to the root  --- @/
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
    },
    chainWebpack: config => {
        config.module
          .rule('vue')
          .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
              options.transpileOptions = {
                transforms: {
                  dangerousTaggedTemplateString: true,
                },
              }
              return options
            })
      },
}
