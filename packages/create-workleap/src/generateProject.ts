import child_process from "node:child_process";
import process from "node:process";
import type { TemplateId } from "./templates.js";

interface UserInputs {
    templateId: TemplateId;
    outputDir: string;
    packageScope?: string;
    hostScope?: string;
}

export async function generateProject({ templateId, outputDir, packageScope, hostScope }: UserInputs) {
    let commandName;
    const args: string[] = [];

    if (outputDir) {
        args.push("-o", outputDir);
    }

    switch (templateId) {
        case "host-application":
            commandName = "host-application";
            if (packageScope) {
                args.push("--package-scope", packageScope);
            }
            break;
        case "remote-module":
            commandName = "remote-module";
            if (hostScope) {
                args.push("--host-scope", hostScope);
            }
            break;
        case "static-module":
            commandName = "static-module";
            if (hostScope) {
                args.push("--host-scope", hostScope);
            }
            break;
    }

    const childProcess = child_process.exec(`npx @workleap/foundry ${commandName} ${args.join(" ")}`);

    return new Promise(resolve => {
        childProcess.stdout?.on("data", x => {
            process.stdout.write(x.toString());
        });
        childProcess.stderr?.on("data", x => {
            process.stderr.write(x.toString());
            process.exit(1);
        });
        childProcess.on("exit", code => {
            resolve(code ?? 0);
        });
    });
}
