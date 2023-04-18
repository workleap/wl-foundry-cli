#!/usr/bin/env node
import process from "process";
import * as p from "@clack/prompts";
import color from "picocolors";

import { name as projectName } from "../package.json";

import { AvailableTemplates, type TemplatesIds, generateProject } from "./generateProject.js";

const DefaultOutputDirectory = "./my-new-project";
const NameParameterPosition = 2; // TODO validate position of parameter once ask with `pnpm create`
const DefaultCancelMessage = "Operation cancelled.";

interface Option<Value> {
    value: Value;
    label?: string;
    hint?: string;
}

const outputDirectoryFromArgument: string = process.argv[NameParameterPosition];

const templates: Option<TemplatesIds>[] = AvailableTemplates.map(x => {
    return { value: x, label: x };
});

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

// Ask for other arguments
const args = await p.group(
    {
        templateId: () => p.select<Option<TemplatesIds>[], TemplatesIds>({
            message: "Select the template to create",
            options: templates
        }),
        scope: () => p.text({
            message: "What should be the scope?",
            placeholder: "Press enter if no scope is needed."
        })
    },
    {
        onCancel: () => {
            p.cancel(DefaultCancelMessage);
            process.exit(0);
        }
    }
);

// Call generateProject
const loader = p.spinner();
loader.start("Generating...");

await generateProject(outputDir, args);

loader.stop("Generated!");

p.outro(color.green("Done!"));
