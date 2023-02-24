module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    'node': true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "overrides": [
  ],
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "eqeqeq": "error",
    "no-trailing-space": "error",
    "object-curly-spacing": [
      "error", "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "no-console": 0,
    "no-unused-vars": 0
  }
}