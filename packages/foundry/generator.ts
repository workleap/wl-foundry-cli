import path from "path";
import { readFile, writeFile } from "fs-extra";
import handlebars from "handlebars";

const MIN_FILE_NAME_SIZE = 2;

const toReplace: { [key: string]: { [key: string]: string } } = {};

const ReplaceInFile = async (
  filePath: string,
  templates: { [key: string]: string }
): Promise<void> => {
  if (!templates || Object.keys(templates).length === 0) {
    return;
  }

  const content: Buffer = await readFile(filePath);

  const template = handlebars.compile(content.toString());
  const newContent = template(templates);

  await writeFile(filePath, newContent);
};

export const AddToReplace = (
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

export const Generator = async (outputDirectory: string): Promise<void> => {
  if (!toReplace || Object.keys(toReplace).length === 0) {
    return;
  }

  for (const file in toReplace) {
    await ReplaceInFile(path.join(outputDirectory, file), toReplace[file]);
  }
};
