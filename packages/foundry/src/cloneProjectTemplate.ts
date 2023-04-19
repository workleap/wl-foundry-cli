import fse from "fs-extra";
import degit from "degit";

export async function cloneProjectTemplate (outputDir: string, repositoryUrl: string): Promise<void> {
    await fse.ensureDir(outputDir);

    const runner = degit(repositoryUrl);
    await runner.clone(outputDir);
}
