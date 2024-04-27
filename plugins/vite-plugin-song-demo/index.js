export default function vitePluginSongDemo() {
  return {
    name: 'vite-plugin-song-demo',
    version: '0.0.1',
    // pre 在vite核心插件之前
    // post 在vite构建插件之后
    // 未设置 则在核心插件之后,在vite构建插件以前
    enforce: 'pre', // pre, post

    // 通用钩子 --------------------- roll-uo

    // 服务启动时候调用一次

    // 1. rollup配置
    options(opts) {
      console.log('opts', opts);
    },

    // 2. 开始加载文件时调用
    buildStart() {
      console.log('buildStart')
    },


    // 每次有模块请求时都会被调用的钩子

    // 1. 创建自定义确认函数
    resolveId(source) {
      console.log('resolveId');
      if (source === 'virtual-module') {
        return source
      }
      return null
    },

    // 2. 加载模块代码
    load(id) {
      console.log('load');
      if (id === 'virtual-module') {
        return `export default 'virtual-module'`
      }
      return null
    },

    // 3. 转换代码
    transform(code, id) {
      console.log('transform');
      if (id === 'virtual-module') {
        return `export default 'virtual-module'`
      }
      return code
    },

    // 服务关闭时调用一次
    buildEnd() {
      console.log('buildEnd');
    },

    closeBundle() {
      console.log('closeBundle');
    },


    // vite特有的钩子 ---------------------
    // // 1. 获取vite配置
    // config(config) {
    //   console.log('config');
    //   return {}
    // },

    // // 2. vite配置确认
    // configResolved(resolvedConfig) {
    //   console.log('configResolved');
    // },

    // // 3. 用于配置dev server
    // configureServer(server) {
    //   console.log('configureServer')
    //   // server.app.use((req, res, next) => {
    //   //   // 自定义请求中间件
    //   // })
    // },

    // // 4. 转换宿主页面
    // transformIndexHtml(html) {
    //   console.log('transformIndexHtml');
    //   // return `<div>12</div>`
    //   return html
    // },

    // // 5. 自定义HMR更新时调用
    // handleHotUpdate({ server, modules, timestamp }) {
    //   console.log('handleHotUpdate');
    // },
  }
}
