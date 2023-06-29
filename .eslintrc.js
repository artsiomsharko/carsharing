module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 2020,
    module: true,
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    semi: "error",
    "no-var": "error",
    "no-multi-spaces": "error",
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "prefer-const": "error",
    "prettier/prettier": "error",
  },
};
