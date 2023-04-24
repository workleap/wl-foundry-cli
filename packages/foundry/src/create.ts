import { basename } from "node:path";

import { cloneProjectTemplate } from "./cloneProjectTemplate.js";
import { replaceTokens } from "./replaceTokens.js";

const BaseRepositoryAddress = "workleap/wl-foundry-cli/templates";

type TemplateId = "host-application" | "remote-module" | "static-module";

interface TemplateDetails {
    repositoryUrl: string;
    action: (outputDirectory: string, options: Record<string, string>) => Promise<void>;
}

const getName = (outputDirectory: string) => {
    return basename(outputDirectory);
};

const getScope = (scope: string) => {
    let formattedScope = scope;

    if (scope) {
        if (formattedScope[0] !== "@") {
            formattedScope = `@${formattedScope}`;
        }

        if (formattedScope.slice(-1) !== "/") {
            formattedScope = `${formattedScope}/`;
        }

        return formattedScope;
    } else {
        return "";
    }
};

const Templates: Map<TemplateId, TemplateDetails> = new Map ([
    ["host-application", {
        repositoryUrl: `${BaseRepositoryAddress}/host-application`,
        action: async (outputDirectory, options) => {
            const scope = getScope(options["packageScope"]);
            const name = getName(options["outDir"]);

            await replaceTokens(["**/package.json", "**/@apps/host", "README.md"], {
                PACKAGE_SCOPE: scope,
                NAME: name
            }, outputDirectory);
        }
    }],
    ["remote-module", {
        repositoryUrl: `${BaseRepositoryAddress}/remote-module`,
        action: async (outputDirectory, options) => {
            const scope = getScope(options["hostScope"]);
            const name = getName(options["outDir"]);

            await replaceTokens(["**"], { HOST_SCOPE: scope, NAME: name }, outputDirectory);
        }
    }],
    ["static-module", {
        repositoryUrl: `${BaseRepositoryAddress}/static-module`,
        action: async (outputDirectory, options) => {
            const scope = getScope(options["hostScope"]);
            const name = getName(options["outDir"]);

            await replaceTokens(["**"], { HOST_SCOPE: scope, NAME: name }, outputDirectory);
        }
    }]
]);

export async function create(templateId: TemplateId, outputDirectory: string, args: Record<string, string>) {
    const template = Templates.get(templateId);

    if (template == null) {
        return;
    }

    await cloneProjectTemplate(outputDirectory, template.repositoryUrl);

    await template.action(outputDirectory, args);
}
