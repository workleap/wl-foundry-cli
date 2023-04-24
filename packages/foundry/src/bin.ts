#!/usr/bin/env node
import path from "node:path";
import process from "node:process";
import { Command } from "commander";
import { type OptionValues } from "@commander-js/extra-typings";

import { Templates, create } from "./create.js";

import packageJson from "../package.json" assert { type: "json" };

const program = new Command();

program.name(packageJson.name).description(packageJson.description).version(packageJson.version);

for (const [ templateId, template ] of Templates) {
    const command = program.command(templateId);

    if (template.description) {
        command.description(template.description);
    }

    // Add default option
    command.option(
        "-o, --out-dir <string>",
        "where to create the template",
        process.cwd()
    );

    if (template.options && template.options.length > 0) {
        for (const option of template.options) {
            if (option.required) {
                command.requiredOption(option.flag, `${option.description} (required)`, option.defaultValue);
            } else {
                command.option(option.flag, option.description, option.defaultValue);
            }
        }
    }

    command.action(async (options: OptionValues) => {
        const outDir = options["outDir"]?.toString() ?? process.cwd();

        await create(template, path.resolve(outDir), options);
    });
}

await program.parseAsync(process.argv);
