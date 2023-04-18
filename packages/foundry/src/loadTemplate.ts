import { Configuration } from "./cli";
import { ensureDir } from "fs-extra";
import degit from "degit";

export const loadTemplate = async (config: Configuration): Promise<void> => {
    await ensureDir(config.outputDirectory);

    const runner = degit(config.repositoryUrl);
    await runner.clone(config.outputDirectory);
};
