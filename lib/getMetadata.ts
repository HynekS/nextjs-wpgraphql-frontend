require("dotenv").config();

const fs = require("fs");
var slugify = require("slugify");
const chalk = require("chalk");

const getMenuItems = require("./api.ts").getMenuItems;
const getContentTypes = require("./api.ts").getContentTypes;

type PathLableTuple = [string, string];

const MANIFEST_FILE_NAME = "global-manifest.json";
const PRIMARY_NAV_NAME = "nav-primary";

async function createManifestsFromCMS() {
  const navItems = await getMenuItems(PRIMARY_NAV_NAME);
  const contentTypes = await getContentTypes();

  const contentTypesTuples: PathLableTuple[] =
    contentTypes?.nodes.map((node) => [
      "/" + slugify(node.label, { lower: true }),
      node.label,
    ]) || [];

  fs.writeFile(
    MANIFEST_FILE_NAME,
    JSON.stringify({ navItems, contentTypesTuples }),
    (err) => {
      if (err) throw err;
      console.log(
        chalk.green(`
-----
Global metadata manifest written to file ${MANIFEST_FILE_NAME}
-----
          `)
      );
    }
  );
}

async function main() {
  try {
    await createManifestsFromCMS();
  } catch (err) {
    throw new Error(err);
  }
}

main();

export {};
