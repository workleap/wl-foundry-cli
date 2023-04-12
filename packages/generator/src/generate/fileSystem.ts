import {
  access,
  mkdir,
  rename,
  readFile,
  writeFile,
  constants,
} from "fs/promises";
import path from "path";

import { ReplacePattern } from "./index";

export class FileSystem {
  static async Rename(oldPath: string, newPath: string): Promise<void> {
    await access(oldPath, constants.R_OK | constants.W_OK);
    await rename(oldPath, newPath);
  }

  static async Move(src: string, newPath: string): Promise<void> {
    try {
      await access(newPath, constants.R_OK | constants.W_OK);
    } catch {
      await mkdir(newPath, {
        recursive: true,
        mode: constants.R_OK | constants.W_OK,
      });
    } finally {
      await FileSystem.Rename(src, path.join(newPath, src));
    }
  }

  static async Replace(src: string, patterns: ReplacePattern[]): Promise<void> {
    if (!patterns || patterns.length === 0) {
      return;
    }

    await access(src, constants.R_OK | constants.W_OK);

    const content: Buffer = await readFile(src);

    let newContent = content.toString();

    for (const pattern of patterns) {
      newContent = newContent.replace(pattern.from, pattern.to);
    }

    await writeFile(src, newContent);
  }
}
