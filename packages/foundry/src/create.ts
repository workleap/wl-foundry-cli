import { basename } from "node:path";

import { cloneProjectTemplate } from "./cloneProjectTemplate.js";
import { replaceTokens } from "./replaceTokens.js";

const BaseRepositoryAddress = "workleap/wl-foundry-cli/templates";

type TemplateId = "host-application" | "remote-module" | "static-module";

interface TemplateDetails {
    repositoryUrl: string;
    action: (outputDirectory: string, options: Record<string, string>) => Promise<void>;
}

function formatScope(scope: string) {
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
}


const Templates: Record<TemplateId, TemplateDetails> = {
    "host-application": {
        repositoryUrl: `${BaseRepositoryAddress}/host-application`,
        action: async (outputDirectory, options) => {
            const scope = formatScope(options["packageScope"]);
            const name = basename(options["outDir"]);

            await replaceTokens(["**/package.json", "**/@apps/host", "README.md"], {
                PACKAGE_SCOPE: scope,
                NAME: name
            }, outputDirectory);
        }
    },
    "remote-module": {
        repositoryUrl: `${BaseRepositoryAddress}/remote-module`,
        action: async (outputDirectory, options) => {
            const scope = formatScope(options["hostScope"]);
            const name = basename(options["outDir"]);

            await replaceTokens(["**"], { HOST_SCOPE: scope, NAME: name }, outputDirectory);
        }
    },
    "static-module": {
        repositoryUrl: `${BaseRepositoryAddress}/static-module`,
        action: async (outputDirectory, options) => {
            const scope = formatScope(options["hostScope"]);
            const name = basename(options["outDir"]);

            await replaceTokens(["**"], { HOST_SCOPE: scope, NAME: name }, outputDirectory);
        }
    }
};

export async function create(templateId: TemplateId, outputDirectory: string, args: Record<string, string>) {
    const template = Templates[templateId];

    if (!template) {
        throw new Error("Invalid template id");
    }

    await cloneProjectTemplate(outputDirectory, template.repositoryUrl);

    await template.action(outputDirectory, args);
}
