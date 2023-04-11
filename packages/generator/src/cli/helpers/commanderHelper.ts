import { Command } from "@commander-js/extra-typings";
import path from "path";
import process from "process";

import * as pkg from "../../../package.json";
import { TemplateInterface } from "../../templates";
import { Aggregator, Options } from "../../aggregator";

interface CommanderOptions {
  outputFolder?: string;

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

  public AddPlugin(template: TemplateInterface): void {
    const command = this.program.command(template.name);

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
      const aggregator = new Aggregator({
        template,
        options: CommanderHelper.MapToAggregatorOption(options),
      });
      await aggregator.Run();

      console.log("Done!");
    });
  }

  public async ParseAsync(): Promise<void> {
    await this.program.parseAsync(process.argv);
  }

  private AddDefaultOptions(command: Command): void {
    command.option(
      "-o, --output-folder <string>",
      "Where to create the template (default: CWD)",
      process.cwd()
    );
  }

  private static MapToAggregatorOption(options: CommanderOptions): Options {
    const outputFolder =
      options.outputFolder != null
        ? path.normalize(options.outputFolder)
        : process.cwd();

    return {
      toReplace: [],
      outputFolder,
      templateSpecificOptions: options,
    };
  }
}
