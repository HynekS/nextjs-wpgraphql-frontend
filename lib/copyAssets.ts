const fs = require("fs-extra");

const currentPath = process.cwd();

const splitted = currentPath.split("\\");
const rootPath = splitted.slice(0, splitted.length - 1).join("/");

fs.copy(
  `${rootPath}/wp/wp-content/uploads`,
  `${rootPath}/next/public/assets/uploads`
)
  .then(() => console.log("Copied!"))
  .catch((err) => console.error(err));

export {};
