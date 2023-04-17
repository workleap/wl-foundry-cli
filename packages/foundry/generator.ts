import path from "path";
import { readFile, writeFile } from "fs-extra";
import handlebars from "handlebars";
import { glob } from "glob";

const MIN_FILE_NAME_SIZE = 2;
const DEFAULT_GLOB_IGNORE = "node_modules/**";

const toReplace: { [key: string]: { [key: string]: string } } = {};

const replaceInFile = async (
  filePattern: string,
  templates: { [key: string]: string }
): Promise<void> => {
  if (!templates || Object.keys(templates).length === 0) {
    return;
  }

  const files = await glob(filePattern, { ignore: DEFAULT_GLOB_IGNORE });

  for (const file of files) {
    const content: Buffer = await readFile(file);

    const template = handlebars.compile(content.toString());
    const newContent = template(templates);

    await writeFile(file, newContent);
  }
};

export const addToReplace = (
  filePath: string,
  templates: { [key: string]: string }
): void => {
  if (filePath.length < MIN_FILE_NAME_SIZE) {
    throw new Error(`File name cannot be smaller then ${MIN_FILE_NAME_SIZE}`);
  }

  if (!toReplace[filePath] === undefined) {
    toReplace[filePath] = {};
  }

  toReplace[filePath] = { ...toReplace[filePath], ...templates };
};

export const generator = async (outputDirectory: string): Promise<void> => {
  if (!toReplace || Object.keys(toReplace).length === 0) {
    return;
  }

  for (const file in toReplace) {
    await replaceInFile(path.join(outputDirectory, file), toReplace[file]);
  }
};
