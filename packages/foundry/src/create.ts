import { cloneProjectTemplate } from "./cloneProjectTemplate.ts";
import { replaceTokens } from "./replaceTokens.ts";
import { mswInit } from "./mswInit.ts";
import { updateDependencies } from "./updateDependencies.ts";

const BaseRepositoryAddress = "workleap/wl-foundry-cli/templates";

type TemplateId = "host-application" | "remote-module" | "static-module" | "web-application";

const TemplateGenerators: Record<TemplateId, (outputDirectory: string, options: Record<string, string>) => Promise<void>> = {
    "host-application": async (outputDirectory, options) => {
        const scope = options["packageScope"];

        await cloneProjectTemplate(outputDirectory, `${BaseRepositoryAddress}/host-application`);

        await replaceTokens(["**/package.json", "**/@apps/host", "README.md"], {
            "PACKAGE-SCOPE": scope
        }, outputDirectory);
    },
    "remote-module": async (outputDirectory, options) => {
        const scope = options["hostScope"];
        const packageName = options["packageName"];

        await cloneProjectTemplate(outputDirectory, `${BaseRepositoryAddress}/remote-module`);

        await replaceTokens(["**"], { "HOST-SCOPE": scope, "PACKAGE-NAME": packageName }, outputDirectory);
    },
    "static-module": async (outputDirectory, options) => {
        const scope = options["hostScope"];
        const packageName = options["packageName"];

        await cloneProjectTemplate(outputDirectory, `${BaseRepositoryAddress}/static-module`);

        await replaceTokens(["**"], { "HOST-SCOPE": scope, "PACKAGE-NAME": packageName }, outputDirectory);
    },
    "web-application": async (outputDirectory, options) => {
        const packageName = options["packageName"];

        await cloneProjectTemplate(outputDirectory, `${BaseRepositoryAddress}/web-application`);

        await replaceTokens(["**"], { "PACKAGE-NAME": packageName }, outputDirectory);

        await mswInit("public/", outputDirectory);

        await updateDependencies(outputDirectory);
    }
};

export async function create(templateId: TemplateId, outputDirectory: string, args: Record<string, string>) {
    const templateGenerator = TemplateGenerators[templateId];

    await templateGenerator(outputDirectory, args);
}
