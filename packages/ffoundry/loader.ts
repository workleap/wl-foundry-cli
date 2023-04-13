import degit from "degit";
import {ensureDir} from "fs-extra";

export const Clone = async (repository: string, destinationDirectory: string): Promise<void> => {
  await ensureDir(destinationDirectory);

  const runner = degit(repository);
  await runner.clone(destinationDirectory);
}
