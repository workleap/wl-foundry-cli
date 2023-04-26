import child_process from "node:child_process";
import type { TemplateId } from "./templates.ts";

export interface GenerateProjectOptionalArguments {
    packageScope?: string;
    hostScope?: string;
}

export async function generateProject(templateId: TemplateId, outputDirectory: string, { packageScope, hostScope }: GenerateProjectOptionalArguments) {
    let commandName;
    const args: string[] = [];

    args.push("-o", outputDirectory);

    switch (templateId) {
        case "host-application":
            commandName = "generate-host-application";
            args.push("--package-scope", packageScope!);
            break;
        case "remote-module":
            commandName = "generate-remote-module";
            args.push("--host-scope", hostScope!);
            break;
        case "static-module":
            commandName = "generate-static-module";
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
