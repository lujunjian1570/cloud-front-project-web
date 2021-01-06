// 官网：https://stylelint.io/
// 中文官网：https://stylelint.cn/
module.exports = {
  root: true,
  plugins: ['stylelint-order'],
  // 配置扩展
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  // 自定义规则配置,会覆盖stylelint-config-standard默认的规则配置
  rules: {
    // 关闭 禁止低优先级的选择器出现在高优先级的选择器之后
    'no-descending-specificity': null,
    // 禁止小于 1 的小数的前面有 0
    'number-leading-zero': 'never',
    // 限制字符串使用双引号
    'string-quotes': 'double',
    // 禁止使用未知的伪类选择器
    'selector-pseudo-class-no-unknown': [true,
      {
        // 项目中使用了:global，所以把global忽略掉
        'ignorePseudoClasses': ['global']
      }
    ],
    // 禁止使用未知的伪元素选择器
    'selector-pseudo-element-no-unknown': [true,
      {
        // 项目中使用了::v-deep，所以把v-deep忽略掉
        'ignorePseudoElements': ['v-deep']
      }
    ],
    // 禁止在注释之前有空行
    'comment-empty-line-before': 'never',
    // 在规则之前禁止使用空行
    'rule-empty-line-before': 'never',
    // 在 @ 规则之前禁止有空行
    'at-rule-empty-line-before': 'never',
    // 在开括号之前不允许有空格
    'block-opening-brace-space-before': 'never',
    // 冒号之后有一个空格
    'declaration-colon-space-after': 'always',
    // 禁止在自定义属性之前有一行空行
    'custom-property-empty-line-before': 'never',
    // 禁止在声明语句之前有空行
    'declaration-empty-line-before': 'never'
  }
}

/* stylelint-config-standard 默认配置
rules: [
  // 要求在 @ 规则之前有空行
  'at-rule-empty-line-before': 'always',
  // 指定 @ 规则名称为小写
  'at-rule-name-case': 'lower',
  // 在多行 @ 规则块中的 @ 规则名称之后必须有一个空格
  'at-rule-name-space-after': 'always-single-line',
  // 要求在 at 规则的分号之后有一个换行符
  'at-rule-semicolon-newline-after': 'always',
  // 禁止在闭括号之前有空行
  'block-closing-brace-empty-line-before': 'never',
  // 在闭括号之后必须有一个换行符
  'block-closing-brace-newline-after': 'always',
  // 在多行声明块的闭括号之前必须有一个换行符
  'block-closing-brace-newline-before': 'always-multi-line',
  // 在单行块的闭括号之前必须有一个空格
  'block-closing-brace-space-before': 'always-single-line',
  // 在多行块的开括号之后必须有一个换行符
  'block-opening-brace-newline-after': 'always-multi-line',
  // 在单行块的开括号之后必须有一个空格
  'block-opening-brace-space-after': 'always-single-line',
  // 在开括号之前必须有一个空格
  'block-opening-brace-space-before': 'always',
  // 指定十六进制颜色为小写
  'color-hex-case': 'lower',
  // 指定十六进制颜色使用缩写
  'color-hex-length': 'short',
  // 在注释之前必须有一行空行
  'comment-empty-line-before': 'always',
  // 在注释标签内必须有空白
  'comment-whitespace-inside': 'always',
  // 要求在自定义属性之前有一行空行
  'custom-property-empty-line-before': 'always',
  // 在感叹号之后禁止有空白
  'declaration-bang-space-after': 'never',
  // 在感叹号之前必须有一个空格
  'declaration-bang-space-before': 'always',
  // 在多行声明块的分号之后必须有一个换行符
  'declaration-block-semicolon-newline-after': 'always-multi-line',
  // 在单行声明块中的分号之后禁止有空白
  'declaration-block-semicolon-space-after': 'always-single-line',
  // 在分号之前禁止有空白
  'declaration-block-semicolon-space-before': 'never',
  // 限制单行声明块中声明的数量
  'declaration-block-single-line-max-declarations': 1,
  // 必须有拖尾分号
  'declaration-block-trailing-semicolon': 'always',
  // 在多行值列表的冒号之后必须有一个换行符
  'declaration-colon-newline-after': 'always-multi-line',
  // 在单行值列表的冒号之后必须有一个空格
  'declaration-colon-space-after': 'always-single-line',
  // 冒号之前不能有空格
  'declaration-colon-space-before': 'never',
  // 要求在声明语句之前有空行
  'declaration-empty-line-before': 'always',
  // 在多行函数的逗号之后必须有一个换行符
  'function-comma-newline-after': 'always-multi-line',
  // 在单行函数的逗号之后必须有一个空格
  'function-comma-space-after': 'always-single-line',
  // 在逗号之前禁止有空白
  'function-comma-space-before': 'never',
  // 限制函数中相邻的空行数量
  'function-max-empty-lines': 0,
  // 指定函数名称为小写
  'function-name-case': 'lower',
  // 在多行函数的括号内必须有一个换行符
  'function-parentheses-newline-inside': 'always-multi-line',
  // 在单行函数的括号内禁止有空白
  'function-parentheses-space-inside': 'never-single-line',
  // 在函数之后必须有空白
  'function-whitespace-after': 'always',
  // 缩进规则（两个空格）
  'indentation': 2,
  // 长度为0时，禁止使用单位
  'length-zero-no-unit': true,
  // 限制相邻空行的数量
  'max-empty-lines': 1,
  // 在 media 特性中的冒号之后必须有一个空格
  'media-feature-colon-space-after': 'always',
  // 在 media 特性中的冒号之前要求禁止有空白
  'media-feature-colon-space-before': 'never',
  // 指定 media 特性名称为小写
  'media-feature-name-case': 'lower',
  // 在media 特性的括号内禁止有空白
  'media-feature-parentheses-space-inside': 'never',
  // 在 media 特性的范围操作符之后要求有一个空格
  'media-feature-range-operator-space-after': 'always',
  // 在 media 特性的范围操作符之前要求有一个空格
  'media-feature-range-operator-space-before': 'always',
  // 在多行媒体查询列表的逗号之后必须有一个换行符
  'media-query-list-comma-newline-after': 'always-multi-line',
  // 在单行媒体查询列表中的逗号之后必须有一个空格
  'media-query-list-comma-space-after': 'always-single-line',
  // 在媒体查询的逗号之前禁止有空白
  'media-query-list-comma-space-before': 'never',
  // 禁止行尾空白
  'no-eol-whitespace': true,
  // 禁止缺少文件末尾的换行符
  'no-missing-end-of-source-newline': true,
  // 要求小于 1 的小数的前导 0
  'number-leading-zero': 'always',
  // 禁止数字中的拖尾 0
  'number-no-trailing-zeros': true,
  // 指定属性为小写
  'property-case': 'lower',
  // 在规则之前使用空行
  'rule-empty-line-before': 'always-multi-line',
  // 在特性(attribute) 选择器的方括号内禁止有空白
  'selector-attribute-brackets-space-inside': 'never',
  // 在特性(attribute)选择器的操作符之后禁止有空白
  'selector-attribute-operator-space-after': 'never',
  // 在特性(attribute)选择器的操作符之前禁止有空白
  'selector-attribute-operator-space-before': 'never',
  // 在关系选择符之后要求有一个空格
  'selector-combinator-space-after': 'always',
  // 在关系选择符之后要求有一个空格
  'selector-combinator-space-before': 'always',
  // 禁止包含选择符出现非空格字符
  'selector-descendant-combinator-no-non-space': true,
  // 要求选择器列表的逗号之后有一个换行符
  'selector-list-comma-newline-after': 'always',
  // 禁止在选择器列表的逗号之前有一个空格
  'selector-list-comma-space-before': 'never',
  // 限制选择器中相邻空行数量
  'selector-max-empty-lines': 0,
  // 指定伪类选择器为小写
  'selector-pseudo-class-case': 'lower',
  // 在伪类选择器的括号内禁止有空白
  'selector-pseudo-class-parentheses-space-inside': 'never',
  // 指定伪元素为小写
  'selector-pseudo-element-case': 'lower',
  // 指定伪元素使用双冒号
  'selector-pseudo-element-colon-notation': 'double',
  // 指定类型选择器为小写
  'selector-type-case': 'lower',
  // 指定单位为小写
  'unit-case': 'lower',
  // 指定关键字的值小写
  'value-keyword-case': 'lower',
  // 在多行值列表的在逗号之后必须有一个换行符
  'value-list-comma-newline-after': 'always-multi-line',
  // 在单行值列表的逗号之后必须有一个空格
  'value-list-comma-space-after': 'always-single-line',
  // 在值列表的逗号之前禁止有空白
  'value-list-comma-space-before': 'never',
  // 限制值列表中相邻空行数量
  'value-list-max-empty-lines': 0
]*/

/* stylelint-config-rational-order
此插件作用是将相关属性声明按照以下顺序进行分组排序
1.Positioning
2.Box Model
3.Typography
4.Visual
5.Animation
6.Misc

例子：
.declaration-order {
  /!* Positioning *!/
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;

  /!* Box Model *!/
  display: block;
  float: right;
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 10px;

  /!* Typography *!/
  color: #888;
  font: normal 16px Helvetica, sans-serif;
  line-height: 1.3;
  text-align: center;

  /!* Visual *!/
  background-color: #eee;
  border: 1px solid #888;
  border-radius: 4px;
  opacity: 1;

  /!* Animation *!/
  transition: all 1s;

  /!* Misc *!/
  user-select: none;
}*/
