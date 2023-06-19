import { join } from "node:path";

import { cloneTemplate } from "./cloneTemplate.ts";
import { replaceTokens } from "./replaceTokens.ts";
import { mswInit } from "./mswInit.ts";
import { updateDependencies } from "./updateDependencies.ts";

const BaseRepositoryAddress = "workleap/wl-foundry-cli/templates";

type TemplateId = "host-application" | "remote-module" | "static-module" | "web-application";

const TemplateGenerators: Record<TemplateId, (outputDirectory: string, options: Record<string, string>) => Promise<void>> = {
    "host-application": async (outputDirectory, options) => {
        const scope = options["packageScope"];

        await cloneTemplate(outputDirectory, `${BaseRepositoryAddress}/host-application`);
        await cloneTemplate(outputDirectory, `${BaseRepositoryAddress}/vscode-config`);

        await replaceTokens(["**/package.json", "**/@apps/host", "README.md"], {
            "PACKAGE-SCOPE": scope
        }, outputDirectory);
    },
    "remote-module": async (outputDirectory, options) => {
        const scope = options["hostScope"];
        const packageName = options["packageName"];

        await cloneTemplate(outputDirectory, `${BaseRepositoryAddress}/remote-module`);
        await cloneTemplate(outputDirectory, `${BaseRepositoryAddress}/vscode-config`);

        await replaceTokens(["**"], { "HOST-SCOPE": scope, "PACKAGE-NAME": packageName }, outputDirectory);
    },
    "static-module": async (outputDirectory, options) => {
        const scope = options["hostScope"];
        const packageName = options["packageName"];

        await cloneTemplate(outputDirectory, `${BaseRepositoryAddress}/static-module`);
        await cloneTemplate(outputDirectory, `${BaseRepositoryAddress}/vscode-config`);

        await replaceTokens(["**"], { "HOST-SCOPE": scope, "PACKAGE-NAME": packageName }, outputDirectory);
    },
    "web-application": async (outputDirectory, options) => {
        const packageName = options["packageName"];
        const projectName = options["projectName"];
        const provider = options["provider"];

        await cloneTemplate(outputDirectory, `${BaseRepositoryAddress}/web-application`);
        await cloneTemplate(outputDirectory, `${BaseRepositoryAddress}/vscode-config`);

        if (provider !== "none") {
            if (provider === "azure") {
                await cloneTemplate(join(outputDirectory, ".ado"), `${BaseRepositoryAddress}/ado-config`);
                console.log("To configure your Azure DevOps pipeline, read the TODO.md file in the .ado directory.");
            } else if (provider === "github") {
                await cloneTemplate(join(outputDirectory, ".github"), `${BaseRepositoryAddress}/github-config`);
                console.log("To configure your GitHub Actions pipeline, read the TODO.md file in the .github directory.");
            } else {
                throw new Error(`Invalid build pipeline: ${provider}`);
            }
        }

        await replaceTokens(["**"], { "PACKAGE-NAME": packageName }, outputDirectory);
        await replaceTokens([".ado/**", ".github/**"], { "PROJECT-NAME": projectName }, outputDirectory);

        await mswInit("public/", outputDirectory);

        await updateDependencies(outputDirectory);
    }
};

export async function create(templateId: TemplateId, outputDirectory: string, args: Record<string, string>) {
    const templateGenerator = TemplateGenerators[templateId];

    await templateGenerator(outputDirectory, args);
}
