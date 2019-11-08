module.exports = {
    "env": {
      "browser": true,
      "es6": true,
      "node": true,
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
      wx: 'readonly',
      App: 'readonly',
      getApp: 'readonly',
      getCurrentPages: 'readonly',
      getRegExp: 'readonly',
      isNaN: 'readonly',
      Component: 'readonly',
      Page: 'readonly',
      Graphics: 'readonly',
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    rules: {
      "no-unused-vars": ["error", { "vars": "local", "args": "after-used", "ignoreRestSiblings": false, varsIgnorePattern: "^regeneratorRuntime" }],
      'max-len': ['error', {
        'code': 512
      }],
      'no-underscore-dangle': [0],
      'no-alert': [0],
      'no-plusplus': [0],
      'no-bitwise': [0],
      'parseInt': [0],
      'no-continue': [0],
      // 'no-console':[0],
      'camelcase':[0],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
    parserOptions: {
      parser: 'babel-eslint',
    },
};
