import child_process from "node:child_process";
import process from "node:process";

const FoundryCmd = "foundry";

export const AvailableTemplates = ["host-application", "remote-module", "static-module"] as const;

export type TemplatesIds = typeof AvailableTemplates[number];

interface Arguments {
    templateId: TemplatesIds;
    scope?: string;
}

export const generateProject = async (outputDir: string, args: Arguments): Promise<number> => {
    const options: string[] = [args.templateId];

    if (outputDir) {
        options.push("-o", outputDir);
    }

    if (args.scope) {
        if (args.templateId === "host-application") {
            options.push("--package-scope", args.scope);
        } else {
            options.push("--host-scope", args.scope);
        }
    }

    const childProcess = child_process.spawn(FoundryCmd, options, {
        cwd: process.cwd(),
        shell: true
    });

    return new Promise(resolve => {
        childProcess.stdout.on("data", (x: string): void => {
            process.stdout.write(x.toString());
        });
        childProcess.stderr.on("data", (x: string): void => {
            process.stderr.write(x.toString());
            process.exit(1);
        });
        childProcess.on("exit", (code?: number): void => {
            resolve(code ?? 0);
        });
    });
};
