import degit from "degit";
import { ensureDir } from "fs-extra";

export async function cloneProjectTemplate (outputDirectory: string, repositoryUrl: string) {
    await ensureDir(outputDirectory);

    const runner = degit(repositoryUrl);
    await runner.clone(outputDirectory);
}
