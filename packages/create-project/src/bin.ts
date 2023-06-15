#!/usr/bin/env node
import process from "node:process";
import { spinner, note, text, intro, isCancel, confirm, select, group } from "@clack/prompts";
import fs from "node:fs";
import path from "node:path";
import colors from "picocolors";
import { generateProject } from "./generateProject.ts";
import packageJson from "../package.json" assert { type: "json" };
import type { TemplateId } from "./templates.ts";

let outputDirectory = process.argv[2];

intro(colors.gray(`${packageJson.name} - v${packageJson.version}`));

const InvalidPathCharactersRegex = /[:*?"<>|]/;

// Ask for output directory
if (!outputDirectory) {
    const directory = await text({
        message: "Where should we create your project?",
        placeholder: "  (hit Enter to use current directory)",
        validate: value => {
            if (InvalidPathCharactersRegex.test(value)) {
                return "Invalid path format";
            }
        }
    });

    if (isCancel(directory)) { process.exit(1); }

    outputDirectory = directory ?? ".";
}

// Check if the directory is empty
if (fs.existsSync(outputDirectory)) {
    if (fs.readdirSync(outputDirectory).length > 0) {
        const force = await confirm({
            message: "The directory is not empty. Do you wish to continue?",
            initialValue: false
        });

        // bail if `force` is `false` or the user cancelled with Ctrl-C
        if (force !== true) {
            process.exit(1);
        }
    }
}

const templateId = await select({
    message: "What would you like to generate?",
    initialValue: "host-application" as TemplateId,
    options: [
        {
            value: "host-application",
            label: "Host application"
        },
        {
            value: "remote-module",
            label: "Remote module"
        },
        {
            value: "static-module",
            label: "Static module"
        },
        {
            value: "web-application",
            label: "Web Application"
        }
    ]
});

if (isCancel(templateId)) { process.exit(1); }

const ValidNpmPackageNameRegex = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

let packageScope: string | undefined;
let hostScope: string | undefined;
let packageName: string | undefined;
let buildPipeline: "github" | "azure" | "none" | undefined;
let projectName: string | undefined;

// Ask for other arguments
if (templateId === "host-application") {
    const packageScopeValue = await text({
        message: "What should be the package scope?",
        placeholder: "ex: @my-app",
        validate: value => {
            if (value === "" || value === undefined) {
                return "You must enter a scope";
            }

            if (!value.startsWith("@")) {
                return "Scope should begin with '@'";
            }

            if (value.endsWith("/")) {
                return "Scope should not end with '/'";
            }
        }
    });

    if (isCancel(packageScopeValue)) { process.exit(1); }

    packageScope = packageScopeValue;
} else if (templateId === "web-application") {
    const packageNameValue = await text({
        message: "What should be the package name?",
        placeholder: "ex: my-package",
        validate: value => {
            if (!ValidNpmPackageNameRegex.test(value)) {
                return "The package name is not valid";
            }
        }
    });

    if (isCancel(packageNameValue)) { process.exit(1); }

    packageName = packageNameValue;

    const buildPipelineValue = await select({
        message: "Should we add CI/CD pipeline?",
        initialValue: "github" as "github" | "azure" | "none",
        options: [
            {
                value: "none",
                label: "No"
            },
            {
                value: "github",
                label: "GitHub"
            },
            {
                value: "azure",
                label: "Azure DevOps"
            }
        ]
    });

    if (isCancel(buildPipelineValue)) { process.exit(1); }

    buildPipeline = buildPipelineValue;

    if (buildPipelineValue !== "none") {
        const projectNameValue = await text({
            message: "What should be the name of the project?",
            placeholder: "ex: my-project"
        });

        if (isCancel(projectNameValue)) { process.exit(1); }

        projectName = projectNameValue;
    }
} else {
    const groupValue = await group({
        packageName: () => text({
            message: "What should be the package name?",
            placeholder: "ex: my-package",
            validate: value => {
                if (!ValidNpmPackageNameRegex.test(value)) {
                    return "The package name is not valid";
                }
            }
        }),
        hostScope: () => text({
            message: "What is the host application scope?",
            placeholder: "ex: @my-app",
            validate: value => {
                if (value === "" || value === undefined) {
                    return "You must enter a scope";
                }

                if (!value.startsWith("@")) {
                    return "Scope should begin with '@'";
                }

                if (value.endsWith("/")) {
                    return "Scope should not end with '/'";
                }
            }
        })
    }, {
        onCancel: () => {
            process.exit(1);
        }
    });

    hostScope = groupValue.hostScope;
    packageName = groupValue.packageName;
}

// Call generateProject
const loader = spinner();
loader.start("Generating your project...");

const status = await generateProject(
    templateId,
    outputDirectory,
    {
        hostScope,
        packageScope,
        packageName,
        buildPipeline,
        projectName
    }
);

if (status === 0) {
    loader.stop(colors.green("Your project is ready!"));

    let stepNumber = 1;
    const nextStepsInstructions = [];

    const relative = path.relative(process.cwd(), outputDirectory);
    if (relative !== "") {
        nextStepsInstructions.push(`  ${stepNumber++}: ${colors.cyan(`cd ${relative}`)}`);
    }
    nextStepsInstructions.push(`  ${stepNumber++}: ${colors.cyan("pnpm install")}`);

    if (buildPipeline === "github") {
        nextStepsInstructions.push(`  ${stepNumber++}: ${colors.cyan("To configure the GitHub Action, follow the instructions in the README.md file")}`); //TODO create this readme
    } else if (buildPipeline === "azure") {
        nextStepsInstructions.push(`  ${stepNumber++}: ${colors.cyan("To configure the Azure DevOps Pipeline, follow the instructions in the README.md file")}`); //TODO create this readme
    }

    note(
        nextStepsInstructions.join("\n"),
        "Next steps:"
    );
} else {
    loader.stop(colors.red("Something went wrong"));
}

process.exitCode = status;
