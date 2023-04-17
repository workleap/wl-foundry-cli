import { Command, OptionValues } from "@commander-js/extra-typings";

import { Options, TemplateInterface, Templates } from "./templates";

import * as pkg from "./package.json";
import process from "process";
import path from "path";

let outputDirectory = "";
let repositoryUrl: string;

export interface Configuration {
  outputDirectory: string;
  repositoryUrl: string;
}

const addDefaultOptionsToCommand = (command: Command): void => {
  command.option(
    "-o, --out-dir <string>",
    `where to create the template`,
    process.cwd()
  );
};

const addCommand = (
  program: Command,
  name: string,
  template: TemplateInterface
) => {
  const command = program.command(name);

  if (template.description) {
    command.description(template.description);
  }

  addDefaultOptionsToCommand(command);

  if (template.options && template.options.length > 0) {
    for (const option of template.options) {
      command.option(option.flag, option.description, option.defaultValue);
    }
  }

  command.action((options: OptionValues, command) => {
    const outDir = options["outDir"]?.toString() ?? process.cwd();
    outputDirectory = path.resolve(outDir);

    repositoryUrl = Templates[command.name()].repositoryUrl;

    template.action ? template.action(options as Options) : options;
  });
};

export const runCli = (): Configuration => {
  const program = new Command();

  program.name(pkg.name).description(pkg.description).version(pkg.version);

  for (const template in Templates) {
    addCommand(program, template, Templates[template]);
  }

  program.parse(process.argv);

  return {
    outputDirectory,
    repositoryUrl,
  };
};
