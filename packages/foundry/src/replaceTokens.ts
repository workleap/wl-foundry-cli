import path from "node:path";
import fse from "fs-extra";
import { glob } from "glob";
import handlebars from "handlebars";

export async function replaceTokens(files: string[], values: { [key:string]: unknown }, outputDir: string): Promise<void> {
    if (!files || files.length === 0 || !values || Object.keys(values).length === 0) {
        return;
    }

    const filesToReplace = await glob(files, { ignore: "node_modules/**", cwd: outputDir });

    for (const fileToReplace in filesToReplace) {
        const fileToReplacePath = path.join(outputDir, fileToReplace);

        const content: Buffer = await fse.readFile(fileToReplacePath);

        const template = handlebars.compile(content.toString());

        await fse.writeFile(fileToReplacePath, template(values));
    }
}
