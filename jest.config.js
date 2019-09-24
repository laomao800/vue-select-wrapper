module.exports = {
  testMatch: [
    '**/tests/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },

  coverageDirectory: '<rootDir>/tests/coverage',
  collectCoverageFrom: ['src/**/*'],

  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],

  transformIgnorePatterns: [
    '/node_modules/'
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  snapshotSerializers: [
    'jest-serializer-vue'
  ],

  testURL: 'http://localhost/',

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
