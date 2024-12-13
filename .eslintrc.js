module.exports = {
  root: true,
  env: {
    node: true,
    // es6: true,
  },
  extends: [
    'eslint:recommended', // 推荐规则
    'plugin:prettier/recommended', // prettier 相关规则
    'plugin:vue/essential', // 校验vue的规则
  ], // 扩展规则
  parserOptions: {
    ecmaVersion: 'latest',
    parser: 'vue-eslint-parser',
    // sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error', // 与prettier冲突的地方就显示警告
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  globals: {
    // 根据情况进行添加
    // ~.
  },
}
