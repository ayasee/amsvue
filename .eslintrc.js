module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    // // 'import/extensions': false,
    // // 2 空格缩进
    // "vue/html-indent": ["error", 2],
    // indent: ["error", 2, { SwitchCase: 1 }],
    // // "import/no-unresolved": "off",
    // "no-param-reassign": "off",
    // "consistent-return": "off",
    // "global-require": "off",
    // "no-multiple-empty-lines": [1, { max: 1 }],
    // "no-empty": "warn",
    // "comma-dangle": ["error", "only-multiline"],
    // "max-len": ["error", { code: 3000 }],
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // // 属性排序
    // "vue/attributes-order": "error",
    // // 组件属性排序
    // "vue/order-in-components": "error",
    // // 模板不能用this
    // // "vue/this-in-template": ['error', 'never']
    // "vue/no-parsing-error": "off",
    // "vue/html-self-closing": "off",
    // "vue/no-multiple-template-root": "off",
    // "key-spacing": ["error", { beforeColon: false }],
    // // 强制for循环按照正确的方向前进
    // "for-direction": "error",
    // // switch语句必须有default分支
    // "default-case": "error",
    // // 不允许使用空函数
    // "no-empty-function": "error",
    // // 禁止在没有类型检查的情况下与null比较
    // "no-eq-null": "error",
    // // 禁止在变量定义之前使用他
    // "no-use-before-define": "error",
    // // 变量的命名一律使用驼峰命名
    // camelcase: "error",
    // // switch 的冒号之后有空格
    // "switch-colon-spacing": ["error", { after: true, before: false }],
    // // 箭头函数的箭头前后都有空格
    // "arrow-spacing": "error",
    // // 要求非空文件末尾存在一行空行
    // "eol-last": "error",
    // // 回调函数中必须有容错处理
    // "handle-callback-err": "error",
    // // 禁止行尾空格
    // "no-trailing-spaces": "error",
    // // 禁止在单行内非缩进情况出现多个空格
    // "no-multi-spaces": "error",
    // //  使用'==='来代替'=='
    // eqeqeq: "error",
    // //  遵循大括号约定
    // curly: "error",
    // // 禁止与自身比较 , if (x===x){}
    // "no-self-compare": "error",
    // // 禁止重复导入
    // "no-duplicate-imports": "error",
    // // 函数名后不需要空格
    // "space-before-function-paren": [
    //   "error",
    //   { anonymous: "never", named: "never", asyncArrow: "never" },
    // ],
  },
};
