#!/usr/bin/env node
import process from "process";
import * as p from "@clack/prompts";
import color from "picocolors";

import { name as projectName } from "../package.json";

import { TemplatesIds, generateProject } from "./generateProject";

const DefaultOutputDirectory = "./my-new-project";
const NameParameterPosition = 2; // TODO validate position of parameter once ask with `pnpm create`
const DefaultCancelMessage = "Operation cancelled.";

const outputDirectoryFromArgument: string = process.argv[NameParameterPosition];

const templates = [
    { value: "host-application", label: "host-application" },
    { value: "remote-module", label: "remote-module" },
    { value: "static-module", label: "static-module" }
];

async function main() {
    p.intro(projectName);

    if (outputDirectoryFromArgument) {
        p.note(`${outputDirectoryFromArgument} project setup`);
    }

    // Ask for output directory
    const outputDir = (
        outputDirectoryFromArgument ??
        (await p.text({
            message: "Where should we create the project?",
            placeholder: DefaultOutputDirectory,
            initialValue: DefaultOutputDirectory
        }))
    );

    if (p.isCancel(outputDir)) {
        p.cancel(DefaultCancelMessage);
        process.exit(0);
    }

    // Ask for template
    const templateId = await p.select({
        message: "Select the template to create",
        options: templates
    });

    if (p.isCancel(templateId)) {
        p.cancel(DefaultCancelMessage);
        process.exit(0);
    }

    // Ask for other arguments
    const args = await p.group(
        {
            scope: () => p.text({
                message: `What should be the ${templateId} scope?`,
                placeholder: "Press enter if no scope is needed."
            })
        },
        {
            // On Cancel callback that wraps the group
            // So if the user cancels one of the prompts in the group this function will be called
            onCancel: () => {
                p.cancel(DefaultCancelMessage);
                process.exit(0);
            }
        }
    );

    // Call generateProject
    const loader = p.spinner();
    loader.start("Generating...");

    await generateProject(templateId as TemplatesIds, outputDir, args);

    loader.stop("Generated!");

    p.outro(color.green("Done!"));
}

main().catch(console.error);
