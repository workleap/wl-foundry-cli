import path from "node:path";
import { cloneProjectTemplate } from "./cloneProjectTemplate.js";
import { replaceTokens } from "./replaceTokens.js";
import { type OptionValues } from "@commander-js/extra-typings";

const BaseRepositoryAddress = "Workleap/wl-foundry-cli/templates";

type TemplateId = "host-application" | "remote-module" | "static-module";

interface TemplateInterface {
    description: string;
    repositoryUrl: string;
    options: {
        flag: string;
        description?: string;
        defaultValue?: string | boolean | [] | string[] | undefined;
    }[];
    action: (outputDir: string, options: OptionValues) => void;
}

const getName = (outputDirectory: string): string => {
    return path.basename(outputDirectory);
};

const getScope = (options: OptionValues, flagName: string): string => {
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

export const Templates: Map<TemplateId, TemplateInterface> = new Map ([
    ["host-application", {
        description: "use the host-application template",
        repositoryUrl: `${BaseRepositoryAddress}/host-application`,
        options: [
            {
                flag: "--package-scope <string>",
                description: "package scope"
            }
        ],
        action: async (outputDir, options): Promise<void> => {
            const scope = getScope(options, "packageScope");
            const name = getName(options["outDir"] as string);

            await replaceTokens(["**/package.json", "**/@apps/host", "README.md"], {
                HOST_SCOPE: scope,
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
                description: "host scope"
            }
        ],
        action: async (outputDir, options): Promise<void> => {
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
                description: "host scope"
            }
        ],
        action: async (outputDir, options): Promise<void> => {
            const scope = getScope(options, "hostScope");
            const name = getName(options["outDir"] as string);

            await replaceTokens(["**"], { HOST_SCOPE: scope, NAME: name }, outputDir);
        }
    }]
]);

export async function create(template: TemplateInterface, outputDir: string, args: OptionValues): Promise<void> {
    await cloneProjectTemplate(outputDir, template.repositoryUrl);

    await template.action(outputDir, args);
}
