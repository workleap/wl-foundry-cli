import { join } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { glob } from "glob";

export async function replaceTokens(globPatterns: string[], values: Record<string, string>, outputDirectory: string) {
    if (!globPatterns || globPatterns.length === 0 || !values || Object.keys(values).length === 0) {
        return;
    }

    const targets = await glob(globPatterns, { cwd: outputDirectory, nodir: true });

    for (const fileToReplace of targets) {
        const target = join(outputDirectory, fileToReplace);

        const content = await readFile(target);

        const newContent = replaceTokensInFile(content.toString(), values);

        await writeFile(target, newContent);
    }
}

const TokenRegex = /{{(.*?)}}/g; // regex to match all tokens in the form of {{TOKEN}}

function replaceTokensInFile(content: string, values: Record<string, string>) {
    return content.replaceAll(TokenRegex, (match, token) => {
        const replacement = values[token];

        return replacement ?? match;
    });
}

