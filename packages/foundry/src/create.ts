import { basename } from "node:path";
import { type OptionValues } from "@commander-js/extra-typings";

import { cloneProjectTemplate } from "./cloneProjectTemplate.js";
import { replaceTokens } from "./replaceTokens.js";

const BaseRepositoryAddress = "workleap/wl-foundry-cli/templates";

type TemplateId = "host-application" | "remote-module" | "static-module";

interface TemplateDetails {
    repositoryUrl: string;
    action: (outputDir: string, options: OptionValues) => void;
}

const getName = (outputDirectory: string) => {
    return basename(outputDirectory);
};

const getScope = (options: OptionValues, flagName: string) => {
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
        action: async (outputDir, options) => {
            const scope = getScope(options, "packageScope");
            const name = getName(options["outDir"] as string);

            await replaceTokens(["**/package.json", "**/@apps/host", "README.md"], {
                PACKAGE_SCOPE: scope,
                NAME: name
            }, outputDir);
        }
    }],
    ["remote-module", {
        repositoryUrl: `${BaseRepositoryAddress}/remote-module`,
        action: async (outputDir, options) => {
            const scope = getScope(options, "hostScope");
            const name = getName(options["outDir"] as string);

            await replaceTokens(["**"], { HOST_SCOPE: scope, NAME: name }, outputDir);
        }
    }],
    ["static-module", {
        repositoryUrl: `${BaseRepositoryAddress}/static-module`,
        action: async (outputDir, options) => {
            const scope = getScope(options, "hostScope");
            const name = getName(options["outDir"] as string);

            await replaceTokens(["**"], { HOST_SCOPE: scope, NAME: name }, outputDir);
        }
    }]
]);

export async function create(templateId: TemplateId, outputDir: string, args: OptionValues) {
    const template = Templates.get(templateId);

    if (template == null) {
        return;
    }

    await cloneProjectTemplate(outputDir, template.repositoryUrl);

    await template.action(outputDir, args);
}
