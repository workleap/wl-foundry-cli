import degit from "degit";
import { mkdir } from "node:fs/promises";

export async function cloneProjectTemplate(outputDirectory: string, repositoryUrl: string) {
    await mkdir(outputDirectory, { recursive: true });

    await degit(repositoryUrl).clone(outputDirectory);
}
