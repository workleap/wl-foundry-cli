import child_process from "node:child_process";
import process from "node:process";

export const AvailableTemplates = ["host-application", "remote-module", "static-module"] as const;
export type TemplateId = typeof AvailableTemplates[number];

export async function generateProject(templateId: TemplateId, outputDir: string, scope?: string) {
    const options: string[] = [templateId];

    if (outputDir) {
        options.push("-o", outputDir);
    }

    if (scope) {
        if (templateId === "host-application") {
            options.push("--package-scope", scope);
        } else {
            options.push("--host-scope", scope);
        }
    }

    const childProcess = child_process.spawn("foundry", options, {
        cwd: process.cwd(),
        shell: true
    });

    return new Promise(resolve => {
        childProcess.stdout.on("data", x => {
            process.stdout.write(x.toString());
        });
        childProcess.stderr.on("data", x => {
            process.stderr.write(x.toString());
            process.exit(1);
        });
        childProcess.on("exit", code => {
            resolve(code ?? 0);
        });
    });
}
