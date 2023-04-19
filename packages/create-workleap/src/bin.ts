#!/usr/bin/env node
import process from "node:process";
import * as p from "@clack/prompts";
import fs from "node:fs";
import path from "node:path";
import colors from "picocolors";
import { AvailableTemplates, generateProject, type TemplateId } from "./generateProject.js";
import packageJson from "../package.json" assert { type: "json" };

// This type is required until this PR has been merged in the @clack/prompts package:
// https://github.com/natemoo-re/clack/pull/102
interface Option<Value> {
    value: Value;
    label?: string;
    hint?: string;
}

let outputDir = process.argv[2];

p.intro(colors.gray(`${packageJson.name} - v${packageJson.version}`));

// Ask for output directory
if (!outputDir) {
    const dir = await p.text({
        message: "Where should we create the project?",
        placeholder: "./my-new-project",
        initialValue: "./my-new-project"
    });

    if (p.isCancel(dir)) {
        p.cancel("Operation cancelled.");
        process.exit(1);
    }

    outputDir = dir as string;
}

// Check if the directory is empty
if (fs.existsSync(outputDir)) {
    if (fs.readdirSync(outputDir).length > 0) {
        const force = await p.confirm({
            message: "Directory not empty. Continue?",
            initialValue: false
        });

        // bail if `force` is `false` or the user cancelled with Ctrl-C
        if (force !== true) {
            process.exit(1);
        }
    }
}

// Ask for other arguments
const { templateId, scope } = await p.group(
    {
        templateId: () => p.select<Option<TemplateId>[], TemplateId>({
            message: "Select the template to create",
            options: AvailableTemplates.map(x => {
                return { value: x, label: x };
            })
        }),
        scope: () => p.text({
            message: "What should be the scope?",
            placeholder: "Press enter if no scope is needed."
        })
    },
    {
        onCancel: () => {
            p.cancel("Operation cancelled.");
            process.exit(1);
        }
    }
);

// Call generateProject
const loader = p.spinner();
loader.start("Generating your project...");

await generateProject(templateId, outputDir, scope);

loader.stop();
p.outro(colors.green("Your project is ready!"));

console.log("Next steps:");
let i = 1;

const relative = path.relative(process.cwd(), outputDir);
if (relative !== "") {
    console.log(`  ${i++}: ${colors.bold(colors.cyan(`cd ${relative}`))}`);
}

console.log(`  ${i++}: ${colors.bold(colors.cyan("pnpm install \n"))}`);
