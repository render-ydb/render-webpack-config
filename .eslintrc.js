const { getESLintConfig } = require("@x.render/render-lint");
module.exports = getESLintConfig("common-ts", {
  rules: {
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/ban-ts-comment": "off",
  },
});
