const { getCommitlintConfig } = require("@x.render/render-lint");
module.exports = getCommitlintConfig("common", {
  rules: {
    "header-max-length": [0, "always"],
  },
});
