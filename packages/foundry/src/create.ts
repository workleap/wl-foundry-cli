import { basename } from "node:path";

import { cloneProjectTemplate } from "./cloneProjectTemplate.ts";
import { replaceTokens } from "./replaceTokens.ts";

const BaseRepositoryAddress = "workleap/wl-foundry-cli/templates";

type TemplateId = "host-application" | "remote-module" | "static-module";

const validNpmPackageNameRegex = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

function validatePackageName(scope:string, name:string) {
    if (!validNpmPackageNameRegex.test(`${scope}/${name}`)) {
        throw new Error(`Invalid package.json name "${scope}/${name}"`);
    }
}

const TemplateGenerators: Record<TemplateId, (outputDirectory: string, options: Record<string, string>) => Promise<void>> = {
    "host-application": async (outputDirectory, options) => {
        const scope = options["packageScope"];
        const name = basename(options["outDir"]);

        validatePackageName(scope, name);

        await cloneProjectTemplate(outputDirectory, `${BaseRepositoryAddress}/host-application`);

        await replaceTokens(["**/package.json", "**/@apps/host", "README.md"], {
            PACKAGE_SCOPE: scope,
            NAME: name
        }, outputDirectory);
    },
    "remote-module": async (outputDirectory, options) => {
        const scope = options["hostScope"];
        const name = basename(options["outDir"]);

        validatePackageName(scope, name);

        await cloneProjectTemplate(outputDirectory, `${BaseRepositoryAddress}/remote-module`);

        await replaceTokens(["**"], { HOST_SCOPE: scope, NAME: name }, outputDirectory);
    },
    "static-module": async (outputDirectory, options) => {
        const scope = options["hostScope"];
        const name = basename(options["outDir"]);

        validatePackageName(scope, name);

        await cloneProjectTemplate(outputDirectory, `${BaseRepositoryAddress}/static-module`);

        await replaceTokens(["**"], { HOST_SCOPE: scope, NAME: name }, outputDirectory);
    }
};

export async function create(templateId: TemplateId, outputDirectory: string, args: Record<string, string>) {
    const templateGenerator = TemplateGenerators[templateId];

    await templateGenerator(outputDirectory, args);
}
