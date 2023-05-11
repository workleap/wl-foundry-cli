#!/usr/bin/env node
import { resolve } from "node:path";
import { argv } from "node:process";
import { Command } from "commander";

import { create } from "./create.ts";

import packageJson from "../package.json" assert { type: "json" };

const program = new Command();

program
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version, "-v, --version");

program.command("generate-host-application")
    .description("use the host-application template")
    .requiredOption(
        "-o, --out-dir <string>",
        "where to create the template (required)"
    )
    .requiredOption(
        "--package-scope <string>",
        "package scope, should begin with a '@' (required)"
    )
    .action(async options => {
        await create("remote-module", resolve(options["outDir"]), options);
    });

program.command("generate-remote-module")
    .description("use the remote-module template")
    .requiredOption(
        "-o, --out-dir <string>",
        "where to create the template (required)"
    )
    .requiredOption(
        "--host-scope <string>",
        "host scope (required)"
    )
    .requiredOption(
        "-n, --package-name <string>",
        "package name (required)"
    )
    .action(async options => {
        await create("remote-module", resolve(options["outDir"]), options);
    });

program.command("generate-static-module")
    .description("use the static-module template")
    .requiredOption(
        "-o, --out-dir <string>",
        "where to create the template (required)"
    )
    .requiredOption(
        "--host-scope <string>",
        "host scope (required)"
    )
    .requiredOption(
        "-n, --package-name <string>",
        "package name (required)"
    )
    .action(async options => {
        await create("remote-module", resolve(options["outDir"]), options);
    });

program.command("generate-web-application")
    .description("use the web-application template")
    .requiredOption(
        "-o, --out-dir <string>",
        "where to create the template (required)"
    )
    .requiredOption(
        "-n, --package-name <string>",
        "package name (required)"
    )
    .action(async options => {
        await create("web-application", resolve(options["outDir"]), options);
    });

program.parse(argv);
