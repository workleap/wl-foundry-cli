import degit from "degit";
import { ensureDir } from "fs-extra";

export async function cloneProjectTemplate (outputDirectory: string, repositoryUrl: string) {
    await ensureDir(outputDirectory);

    await degit(repositoryUrl).clone(outputDirectory);
}
