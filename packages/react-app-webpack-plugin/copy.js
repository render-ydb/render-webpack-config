const path = require("path");
const fse = require("fs-extra");

fse.copySync(
  path.resolve(__dirname, "src", "views"),
  path.resolve(__dirname, "lib", "views")
);
