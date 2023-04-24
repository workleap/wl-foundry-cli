import { join } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { glob } from "glob";
import { compile } from "handlebars";

export async function replaceTokens(globPatterns: string[], values: Record<string, unknown>, outputDirectory: string) {
    if (!globPatterns || globPatterns.length === 0 || !values || Object.keys(values).length === 0) {
        return;
    }

    const filesToReplace = await glob(globPatterns, { cwd: outputDirectory, nodir: true });

    for (const fileToReplace of filesToReplace) {
        const fileToReplacePath = join(outputDirectory, fileToReplace);

        const content = await readFile(fileToReplacePath);

        const template = compile(content.toString());

        await writeFile(fileToReplacePath, template(values));
    }
}
