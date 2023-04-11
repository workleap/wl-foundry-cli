import events from "events";

import { TemplateInterface } from "./templates";
import { Loader } from "./loader";
import { Generate, ReplaceInFile } from "./generate";
import process from "process";
import path from "path";

export interface Options {
  outputFolder: string;
  toReplace: ReplaceInFile[];
  templateSpecificOptions: {
    [key: string]: string | boolean | undefined;
  };
}

export interface Configuration {
  template: TemplateInterface;
  options: Options;
}

export class Generator {
  private readonly _template: TemplateInterface;
  private readonly _loader: Loader;
  private readonly _generator: Generate;
  private readonly _options: Options;

  public readonly LoaderEvent: events.EventEmitter;
  public readonly GeneratorEvent: events.EventEmitter;

  constructor(configuration: Configuration) {
    this._template = configuration.template;
    this._options = configuration.options;

    this._loader = new Loader(this._template.repositoryUrl);
    this._generator = new Generate();

    this.LoaderEvent = this._loader.loaderEvent;
    this.GeneratorEvent = this._generator.generatorEvent;
  }

  public async Run(): Promise<void> {
    const options: Options =
      this._template.action == undefined
        ? this._options
        : await this._template.action(this._options);

    this.AddDefaultTextToReplace(options);

    await this._loader.Clone(options.outputFolder ?? process.cwd());
    await this._generator.Run(options.toReplace);
  }

  private AddDefaultTextToReplace(options: Options) {
    options.toReplace.push({
      src: "package.json",
      patterns: [{ from: /<%name%>/, to: path.basename(options.outputFolder) }],
    });
  }
}
