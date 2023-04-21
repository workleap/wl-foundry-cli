#!/usr/bin/env node
import process from "node:process";
import * as p from "@clack/prompts";
import fs from "node:fs";
import path from "node:path";
import colors from "picocolors";
import { generateProject } from "./generateProject.js";
import packageJson from "../package.json" assert { type: "json" };
import { type TemplateId } from "./templates.js";

let outputDir = process.argv[2];

p.intro(colors.gray(`${packageJson.name} - v${packageJson.version}`));

// Ask for output directory
if (!outputDir) {
    const dir = await p.text({
        message: "Where should we create your project?",
        placeholder: "  (hit Enter to use current directory)"
    });

    if (p.isCancel(dir)) { process.exit(1); }

    outputDir = dir ?? ".";
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

const templateId = await p.select({
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
        }
    ]
});

if (p.isCancel(templateId)) { process.exit(1); }

// Ask for other arguments
let packageScope: string | undefined;
let hostScope: string | undefined;

if (templateId === "host-application") {
    packageScope = await p.text({
        message: "What should be the package scope?",
        placeholder: "  (hit Enter if no scope is needed)"
    }) as string;

    if (p.isCancel(packageScope)) { process.exit(1); }
} else {
    hostScope = await p.text({
        message: "What is the host application scope?",
        placeholder: "  (hit Enter if no scope is needed)"

    }) as string;

    if (p.isCancel(hostScope)) { process.exit(1); }
}

// Call generateProject
const loader = p.spinner();
loader.start("Generating your project...");

await generateProject({
    templateId,
    outputDir,
    packageScope,
    hostScope
});

loader.stop();

p.outro(colors.green("Your project is ready!"));

console.log("Next steps:");
let i = 1;

const relative = path.relative(process.cwd(), outputDir);
if (relative !== "") {
    console.log(`  ${i++}: ${colors.bold(colors.cyan(`cd ${relative}`))}`);
}

console.log(`  ${i++}: ${colors.bold(colors.cyan("pnpm install \n"))}`);
