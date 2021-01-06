module.exports = {
  collectCoverage: true,
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  setupFiles: ['<rootDir>/tests/testSetup.js'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // 快照的序列化工具
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverageFrom: [
    'src/components/**/*.{js,vue}',
    'src/pages/**/*.{js,vue}',
    'src/utils/**/*.js',
    // 忽略的
    '!src/components/cache/**',
    '!src/components/card/**',
    '!src/components/chart/**',
    '!src/components/checkbox/**',
    '!src/components/exception/**',
    '!src/components/form/**',
    '!src/components/input/**',
    '!src/components/menu/**',
    '!src/components/page/**',
    '!src/components/result/**',
    '!src/components/setting/**',
    '!src/components/table/**',
    '!src/components/task/**',
    '!src/components/tool/**',
    '!src/components/transition/**',
    '!src/pages/**/i18n.js',
    '!src/pages/**/index.js',
    '!src/pages/advert/**',
    '!src/pages/demo/**',
    '!src/pages/exception/**',
    '!src/utils/authority-utils.js',
    '!src/utils/axios-interceptors.js',
    '!src/utils/colors.js',
    '!src/utils/formatter.js',
    '!src/utils/i18n.js',
    '!src/utils/Objects.js',
    '!src/utils/routerUtil.js',
    '!src/utils/theme-color-replacer-extend.js',
    '!src/utils/themeUtil.js'
  ],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  coverageReporters: [
    'lcov',
    'text-summary'
  ],
  testURL: 'http://localhost/',
  preset: '@vue/cli-plugin-unit-jest'
}
