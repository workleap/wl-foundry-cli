import { join } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { glob } from "glob";
import { isBinary } from "istextorbinary";

export async function replaceTokens(globPatterns: string[], values: Record<string, string>, outputDirectory: string) {
    const targets = await glob(globPatterns, { cwd: outputDirectory, nodir: true });

    for (const target of targets) {
        const targetPath = join(outputDirectory, target);

        const content = await readFile(targetPath);

        if (isBinary(targetPath, content)) {
            return;
        }

        const oldContent = content.toString();
        const newContent = replaceTokensInFile(oldContent, values);

        // only write the file if it has changed
        if (oldContent !== newContent) {
            await writeFile(targetPath, newContent);
        }
    }
}

const TokenRegex = /{{(.*?)}}/g; // regex to match all tokens in the form of {{TOKEN}}

function replaceTokensInFile(content: string, values: Record<string, string>) {
    return content.replaceAll(TokenRegex, (match, token) => {
        const replacement = values[token];

        return replacement ?? match;
    });
}

