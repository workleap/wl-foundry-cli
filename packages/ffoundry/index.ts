import * as process from "process";
import * as path from "path";
import { Command } from "@commander-js/extra-typings";
import {ensureDir, ensureFile, readFile, writeFile} from "fs-extra";
import degit from "degit";

interface ReplacePattern {
  from: RegExp;
  to: string;
}

interface ReplaceInFile {
  src: string;
  patterns: ReplacePattern[];
}

const CliSupport() = {

};

const LoadTemplate = async (repository: string, outputDirectory: string): Promise<void> => {
  await ensureDir(outputDirectory);

  const runner = degit(repository);
  await runner.clone(outputDirectory);
};

const Replace = async (filePath: string, patterns: ReplacePattern[]): Promise<void> => {
  if (!patterns || patterns.length === 0) {
    return;
  }

  await ensureFile(filePath);

  const content: Buffer = await readFile(filePath);

  let newContent = content.toString();

  for (const pattern of patterns) {
    newContent = newContent.replace(pattern.from, pattern.to);
  }

  await writeFile(filePath, newContent);
};

const GenerateTemplate = async (outputDirectory: string, tasks: ReplaceInFile[]): Promise<void> => {
  for (const task of tasks) {
    await Replace(task.src, task.patterns);
  }
};
