import child_process from "node:child_process";
import type { TemplateId } from "./templates.js";

interface UserInputs {
    templateId: TemplateId;
    outputDirectory: string;
    packageScope?: string;
    hostScope?: string;
}

export async function generateProject({ templateId, outputDirectory, packageScope, hostScope }: UserInputs) {
    let commandName;
    const args: string[] = [];

    if (outputDirectory) {
        args.push("-o", outputDirectory);
    }

    switch (templateId) {
        case "host-application":
            commandName = "host-application";
            args.push("--package-scope", packageScope!);
            break;
        case "remote-module":
            commandName = "remote-module";
            args.push("--host-scope", hostScope!);
            break;
        case "static-module":
            commandName = "static-module";
            args.push("--host-scope", hostScope!);
            break;
    }

    const childProcess = child_process.exec(`npx @workleap/foundry ${commandName} ${args.join(" ")}`);

    return new Promise(resolve => {
        childProcess.on("exit", code => {
            resolve(code ?? 0);
        });
    });
}
