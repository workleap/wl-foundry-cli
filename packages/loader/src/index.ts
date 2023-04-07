import degit from "degit";
import { access, mkdir, constants } from "node:fs/promises";

export class Loader {
  private static readonly DEFAULT_CONFIG: {
    cache: boolean;
    force: boolean;
    verbose: boolean;
  } = {
    cache: true,
    force: true,
    verbose: true,
  };

  private readonly runner;

  constructor(repo: string) {
    this.runner = degit(repo, Loader.DEFAULT_CONFIG);
  }

  async Clone(dest: string): Promise<void> {
    try {
      await access(dest, constants.R_OK | constants.W_OK);
    } catch {
      await mkdir(dest, {
        recursive: true,
        mode: constants.R_OK | constants.W_OK,
      });
    } finally {
      await this.runner.clone(dest);
    }
  }
}
