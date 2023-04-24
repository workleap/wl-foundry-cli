import degit from "degit";
import { ensureDir } from "fs-extra";

export async function cloneProjectTemplate (outputDir: string, repositoryUrl: string) {
    await ensureDir(outputDir);

    const runner = degit(repositoryUrl);
    await runner.clone(outputDir);
}
