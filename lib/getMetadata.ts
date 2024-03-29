require("dotenv").config();

const fs = require("fs");
var slugify = require("slugify");
const chalk = require("chalk");
const dedent = require("dedent");
// Intellisense displays 'fetch' as unused, however, scripts would break if removed
const fetch = require("isomorphic-fetch");

const getMenuItems = require("./api.ts").getMenuItems;
const getContentTypes = require("./api.ts").getContentTypes;

type PathLabelTuple = [string, string];

const MANIFEST_FILE_NAME = "global-manifest.json";
const PRIMARY_NAV_NAME = "nav-primary";

type ContentTypeNode = {
  label: string;
};

async function createManifestsFromCMS() {
  const navItems = await getMenuItems(PRIMARY_NAV_NAME);
  const contentTypes = await getContentTypes();

  const contentTypesTuples: PathLabelTuple[] =
    contentTypes?.nodes.map((node: ContentTypeNode) => [
      "/" + slugify(node.label, { lower: true }),
      node.label,
    ]) || [];

  fs.writeFile(
    MANIFEST_FILE_NAME,
    JSON.stringify({ navItems, contentTypesTuples }),
    (err: Error) => {
      if (err) throw err;
      console.log(
        chalk.green(dedent`
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
    throw new Error(String(err));
  }
}

main();

export {};
