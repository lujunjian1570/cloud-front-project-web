// eslint：http://eslint.cn/
// eslint-plugin-vue：https://eslint.vuejs.org
module.exports = {
  // 此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  // 此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  // 此项指定环境的全局变量
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  // 配置扩展
  extends: [
    // eslint推荐规则
    'eslint:recommended',
    // vue eslint 基本规则
    'plugin:vue/base',
    // Vue eslint A级推荐规则预设
    'plugin:vue/essential',
    // Vue eslint B级推荐规则预设
    'plugin:vue/strongly-recommended',
    // Vue eslint C级推荐规则预设
    'plugin:vue/recommended'
  ],

  // 这里可以设置规则：
  // 'off' or 0 - 关闭规则
  // 'warn' or 1 - 将规则作为警告打开
  // 'error' or 2 - 将规则作为错误打开
  rules: {
    // 禁止使用v-html
    'vue/no-v-html': 0,
    // props必须定义类型
    'vue/require-prop-types': 0,
    // props必须有默认值
    'vue/require-default-prop': 0,
    // 强制使用一致的缩进风格（2个空格）
    'indent': [2, 2, {
      // 强制 switch 语句中的 case 子句的缩进（默认是0，咱们设置为1个缩进，即两个空格）
      'SwitchCase': 1,
    }],
    // 强制使用驼峰法命名
    'camelcase': 2,
    // 不使用分号
    'semi': [2, 'never'],
    // 强制使用单引号
    'quotes': [2, 'single'],
    // 强制 getter 和 setter 在对象中成对出现
    'accessor-pairs': 2,
    // 强制箭头函数的箭头前后有空格
    'arrow-spacing': 2,
    // 强制数组方法的回调函数中有 return 语句
    'array-callback-return': 2,
    // 强制多行控制语句使用大括号
    'curly': [2, 'multi-line'],
    // 要求 switch 语句中有 default 分支
    'default-case': 2,
    // 选项 'property' 要求点操作符和属性放在同一行
    'dot-location': [2, 'property'],
    // 生产环境禁用 alert（如果打包时代码中有alert就报错提示）
    'no-alert': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 禁止使用多个空格
    'no-multi-spaces': 2,
    // 禁止使用多行字符串
    'no-multi-str': 2,
    // 禁用 __proto__ 属性（__proto__ 属性在 ECMAScript 3.1 中已经被弃用）
    'no-proto': 2,
    // 禁止使用不带 await 表达式的 async 函数
    'require-await': 2,
    // 要求所有的立即执行函数表达式使用括号包裹起来
    'wrap-iife': [2, 'any'],
    // 不能使用 Yoda 条件
    'yoda': [2, 'never'],
    // 禁止出现多行空行（最多一行）
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    // 禁用行尾空格
    'no-trailing-spaces': 2,
    // 禁止属性前有空白
    'no-whitespace-before-property': 2,
    // 强制在花括号中使用一致的空格
    'object-curly-spacing': [2, 'always'],
    // 强制操作符使用一致的换行符风格（要求把换行符放在操作符后面）
    'operator-linebreak': 2,
    // 禁止块语句和类的开始或末尾有空行
    'padded-blocks': [2, 'never'],
    // 强制在块之前使用一致的空格
    'space-before-blocks': 2,
    // 强制在function的左括号之前不使用空格
    'space-before-function-paren': [2, 'never'],
    // 要求圆括号内没有空格
    'space-in-parens': [2, 'never'],
    // 要求操作符周围有空格
    'space-infix-ops': 2,
    // 强制在一元操作符前后使用一致的空格
    'space-unary-ops': [2, {
      // words（如：new、delete、typeof、void、yield） 一元操作符后有空格
      'words': true,
      // nonwords（如：-、+、--、++、!、!!） 一元操作符之前或之后沒有空格
      'nonwords': false
    }],
    // 强制注释中 // 或 /* 后有空格
    'spaced-comment': 2,
    // 强制在 switch 的冒号左边没有空格，右边有空格
    'switch-colon-spacing': 2,
    // 要求使用 let 或 const 而不是 var
    'no-var': 2,
    // 强制模板字符串中空格的使用（禁止花括号内出现空格）
    'template-curly-spacing': 2
  }
}
