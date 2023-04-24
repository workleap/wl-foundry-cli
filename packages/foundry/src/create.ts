import { basename } from "node:path";
import { type OptionValues } from "@commander-js/extra-typings";

import { cloneProjectTemplate } from "./cloneProjectTemplate.js";
import { replaceTokens } from "./replaceTokens.js";

const BaseRepositoryAddress = "workleap/wl-foundry-cli/templates";

type TemplateId = "host-application" | "remote-module" | "static-module";

interface TemplateDetails {
    description: string;
    repositoryUrl: string;
    options: {
        flag: string;
        description?: string;
        defaultValue?: string | boolean | [] | string[] | undefined;
        required?: boolean;
    }[];
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

export const Templates: Map<TemplateId, TemplateDetails> = new Map ([
    ["host-application", {
        description: "use the host-application template",
        repositoryUrl: `${BaseRepositoryAddress}/host-application`,
        options: [
            {
                flag: "--package-scope <string>",
                description: "package scope",
                required: true
            }
        ],
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
        description: "use the remote-module template",
        repositoryUrl: `${BaseRepositoryAddress}/remote-module`,
        options: [
            {
                flag: "--host-scope <string>",
                description: "host scope",
                required: true
            }
        ],
        action: async (outputDir, options) => {
            const scope = getScope(options, "hostScope");
            const name = getName(options["outDir"] as string);

            await replaceTokens(["**"], { HOST_SCOPE: scope, NAME: name }, outputDir);
        }
    }],
    ["static-module", {
        description: "use the static-module template",
        repositoryUrl: `${BaseRepositoryAddress}/static-module`,
        options: [
            {
                flag: "--host-scope <string>",
                description: "host scope",
                required: true
            }
        ],
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
