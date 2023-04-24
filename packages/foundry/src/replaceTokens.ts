import { join } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { glob } from "glob";
import { compile } from "handlebars";

export async function replaceTokens(files: string[], values: Record<string, unknown>, outputDir: string) {
    if (!files || files.length === 0 || !values || Object.keys(values).length === 0) {
        return;
    }

    const filesToReplace = await glob(files, { ignore: "node_modules/**", cwd: outputDir, nodir: true });

    for (const fileToReplace of filesToReplace) {
        const fileToReplacePath = join(outputDir, fileToReplace);

        const content = await readFile(fileToReplacePath);

        const template = compile(content.toString());

        await writeFile(fileToReplacePath, template(values));
    }
}
