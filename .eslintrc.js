module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["eslint:recommended", "plugin:vue/recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "warn"
  }
};
