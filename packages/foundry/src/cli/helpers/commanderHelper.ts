import { Command } from "@commander-js/extra-typings";
import path from "path";
import process from "process";

import * as pkg from "../../../package.json";
import { TemplateInterface } from "../../templates";
import { Generator, Options } from "../../generator";

interface CommanderOptions {
  outDir?: string;

  [key: string]: string | undefined;
}

export default class CommanderHelper {
  private program: Command;

  constructor() {
    this.program = new Command();
    this.program
      .name(pkg.name)
      .description(pkg.description)
      .version(pkg.version);
  }

  public AddPlugin(name: string, template: TemplateInterface): void {
    const command = this.program.command(name);

    if (template.description) {
      command.description(template.description);
    }

    this.AddDefaultOptions(command);

    if (template.options && template.options.length > 0) {
      for (const option of template.options) {
        command.option(option.flag, option.description, option.defaultValue);
      }
    }

    command.action(async (options: CommanderOptions) => {
      const generator = new Generator({
        template,
        options: CommanderHelper.MapToAggregatorOption(options),
      });
      await generator.Run();

      console.log("Done!");
    });
  }

  public async ParseAsync(): Promise<void> {
    await this.program.parseAsync(process.argv);
  }

  private AddDefaultOptions(command: Command): void {
    command.option(
      "-o, --out-dir <string>",
      "Where to create the template (default: CWD)",
      process.cwd()
    );
  }

  private static MapToAggregatorOption(options: CommanderOptions): Options {
    const outDir =
      options.outDir != null
        ? path.normalize(options.outDir)
        : process.cwd();

    return {
      toReplace: [],
      outDir,
      templateSpecificOptions: options,
    };
  }
}
