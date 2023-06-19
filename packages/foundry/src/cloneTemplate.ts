import degit from "degit";
import { mkdir } from "node:fs/promises";

export async function cloneTemplate(outputDirectory: string, repositoryUrl: string) {
    await mkdir(outputDirectory, { recursive: true });

    await degit(repositoryUrl, { force: true }).clone(outputDirectory);
}
