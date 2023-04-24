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

const getScope = (options: Record<string, string>, flagName: string) => {
    let scope = options[flagName] as string;

    if (scope) {
        if (scope[0] !== "@") {
            scope = `@${scope}`;
        }

        if (scope.slice(-1) !== "/") {
            scope = `${scope}/`;
        }

        return scope;
    } else {
        return "";
    }
};

const Templates: Map<TemplateId, TemplateDetails> = new Map ([
    ["host-application", {
        repositoryUrl: `${BaseRepositoryAddress}/host-application`,
        action: async (outputDirectory, options) => {
            const scope = getScope(options, "packageScope");
            const name = getName(options["outDir"] as string);

            await replaceTokens(["**/package.json", "**/@apps/host", "README.md"], {
                PACKAGE_SCOPE: scope,
                NAME: name
            }, outputDirectory);
        }
    }],
    ["remote-module", {
        repositoryUrl: `${BaseRepositoryAddress}/remote-module`,
        action: async (outputDirectory, options) => {
            const scope = getScope(options, "hostScope");
            const name = getName(options["outDir"] as string);

            await replaceTokens(["**"], { HOST_SCOPE: scope, NAME: name }, outputDirectory);
        }
    }],
    ["static-module", {
        repositoryUrl: `${BaseRepositoryAddress}/static-module`,
        action: async (outputDirectory, options) => {
            const scope = getScope(options, "hostScope");
            const name = getName(options["outDir"] as string);

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
