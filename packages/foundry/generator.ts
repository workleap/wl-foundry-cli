import path from "path";
import { readFile, writeFile } from "fs-extra";
import handlebars from "handlebars";

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
  if (!toReplace[filePath] === undefined) {
    toReplace[filePath] = {};
  }

  toReplace[filePath] = { ...toReplace[filePath], ...templates };
};

export const Generate = async (outputDirectory: string): Promise<void> => {
  if (!toReplace || Object.keys(toReplace).length === 0) {
    return;
  }

  for (const file in toReplace) {
    await ReplaceInFile(path.join(outputDirectory, file), toReplace[file]);
  }
};
