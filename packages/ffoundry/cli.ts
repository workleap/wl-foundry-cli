import {Command} from "@commander-js/extra-typings";

import {TemplateInterface, Templates} from "./templates";

import * as pkg from "./package.json";
import process from "process";

const AddDefaultOptionsToCommand = (command: Command): void => {
  command.option(
    "-o, --out-dir <string>",
    "Where to create the template (default: CWD)",
    process.cwd()
  );
}

const AddCommand = (program: Command, name: string, template: TemplateInterface) => {
  const command = program.command(name);

  if (template.description) {
    command.description(template.description);
  }

  AddDefaultOptionsToCommand(command);

  if (template.options && template.options.length > 0) {
    for (const option of template.options) {
      command.option(option.flag, option.description, option.defaultValue);
    }
  }

  command.action(() => {
      // TODO stuff here
      // maybe just return the cli result
    }
  );
};

export const Create = async () => {
  const program = new Command();

  program
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version);

  AddDefaultOptionsToCommand(program);

  program.option(
    "-o, --out-dir <string>",
    "Where to create the template (default: CWD)",
    process.cwd()
  );

  for (const template in Templates) {
    AddCommand(program, template, Templates[template]);
  }

  await program.parseAsync(process.argv);
}