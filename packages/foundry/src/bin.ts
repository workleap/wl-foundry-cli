#!/usr/bin/env node
import { resolve } from "node:path";
import { cwd, argv } from "node:process";
import { Command } from "commander";

import { create } from "./create.js";

import packageJson from "../package.json" assert { type: "json" };

const program = new Command();

program
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version, "-v, --version");

program.command("generate-host-application")
    .description("use the host-application template")
    .option(
        "-o, --out-dir <string>",
        "where to create the template",
        cwd()
    )
    .requiredOption(
        "--package-scope <string>",
        "package scope, should begin with a '@' (required)"
    )
    .action(async options => {
        const outDir = options["outDir"]?.toString() ?? cwd();

        await create("host-application", resolve(outDir), options);
    });

program.command("generate-remote-module")
    .description("use the remote-module template")
    .option(
        "-o, --out-dir <string>",
        "where to create the template",
        cwd()
    )
    .requiredOption(
        "--host-scope <string>",
        "host scope (required)"
    )
    .action(async options => {
        const outDir = options["outDir"]?.toString() ?? cwd();

        await create("remote-module", resolve(outDir), options);
    });


program.command("generate-static-module")
    .description("use the static-module template")
    .option(
        "-o, --out-dir <string>",
        "where to create the template",
        cwd()
    )
    .requiredOption(
        "--host-scope <string>",
        "host scope (required)"
    )
    .action(async options => {
        const outDir = options["outDir"]?.toString() ?? cwd();

        await create("static-module", resolve(outDir), options);
    });

program.parse(argv);
