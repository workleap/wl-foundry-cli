import child_process from "node:child_process";
import type { TemplateId } from "./templates.ts";

export interface GenerateProjectOptionalArguments {
    packageScope?: string;
    hostScope?: string;
    packageName?: string;
    provider?: "github" | "azure" | "none";
    projectName?: string;
}

export async function generateProject(templateId: TemplateId, outputDirectory: string, { packageScope, hostScope, packageName, provider, projectName }: GenerateProjectOptionalArguments) {
    let commandName;
    const args: string[] = [];

    args.push("--out-dir", outputDirectory);

    switch (templateId) {
        case "host-application":
            commandName = "generate-host-application";
            args.push("--package-scope", `"${packageScope!}"`);
            break;
        case "remote-module":
            commandName = "generate-remote-module";
            args.push("--host-scope", `"${hostScope!}"`);
            args.push("--package-name", `"${packageName!}"`);
            break;
        case "static-module":
            commandName = "generate-static-module";
            args.push("--host-scope", `"${hostScope!}"`);
            args.push("--package-name", `"${packageName!}"`);
            break;
        case "web-application":
            commandName = "generate-web-application";
            args.push("--package-name", `"${packageName!}"`);
            args.push("--provider", `"${provider!}"`);
            if (projectName) {args.push("--project-name", `"${projectName!}"`);}
            break;
        case "typescript-library":
            commandName = "generate-typescript-library";
            args.push("--package-name", `"${packageName!}"`);
            break;
    }

    const childProcess = child_process.exec(`npx --yes @workleap/foundry@latest ${commandName} ${args.join(" ")}`);

    return new Promise<number>(resolve => {
        childProcess.on("error", error => {
            console.error(error);
            resolve(1);
        });
        childProcess.stderr?.on("data", (x: string): void => {
            console.error(x);
            resolve(1);
        });
        childProcess.on("exit", code => {
            resolve(code ?? 0);
        });
    });
}
