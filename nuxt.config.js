const env = process.env.ENV
export default {
  buildDir: './bundle',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '顺风耳设计',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  env: {
    APP_ENV: process.env.ENV,
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    { src: '~/assets/scss/common.scss', lang: 'scss' },
    // { src: '@yige/base/bin/index.css', lang: 'css' },
  ],
  // 配置全局scss

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/element-ui'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // 添加设置scss变量的插件
    '@nuxtjs/style-resources',
    // '@nuxtjs/axios',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },

  // 手动配置@nuxtjs/style-resources
  styleResources: {
    scss: [
      // 在这里不能使用路径别名 ～ 和 @
      './assets/scss/common.scss',
      // '@yige/base/styles/scss/index.scss',
    ],
  },
  //配置局域网访问
  server: {
    host: '0.0.0.0',
    port: env === 'test' ? 3001 : 3000,
  },
  //js引入问题
  generate: {
    subFolders: true,
  },
  router: { base: '/' },
}
