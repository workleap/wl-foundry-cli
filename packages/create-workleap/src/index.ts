import * as process from "process";
import {
  Aggregator,
  Templates,
  TemplateInterface,
  Configuration,
  LoaderStartCloningEventName,
  LoaderStopCloningEventName,
  GeneratorStartEventName,
  GeneratorStopEventName,
} from "@foundry-cli/generator";

import { Color, Option, Output, Prompt, Spinner } from "./propmts";
import { ConfigurationBuilder } from "./propmts/helpers/configurationBuilder";

export class CreateWorkleap {
  private static readonly DEFAULT_OUTPUT_FOLDER: string = "./my-new-project";
  private static readonly NAME_PARAMETER_POSITION: number = 2; // TODO validate position of parameter once ask with `pnpm create`

  private readonly prompt: Prompt;
  private readonly loaderSpinner: Spinner;
  private readonly generatorSpinner: Spinner;

  constructor() {
    this.prompt = new Prompt("create-workleap");
    this.loaderSpinner = new Spinner("Loading the template...");
    this.generatorSpinner = new Spinner("Template configuration...");
  }

  async Run(): Promise<void> {
    const config = await this.Configure();

    const aggregator = new Aggregator(config);

    this.AddListeners(aggregator);

    await aggregator.Run();

    this.prompt.Outro("Done!");
  }

  private async Configure(): Promise<Configuration> {
    const availableTemplates: Option<string>[] = Templates.map(
      (x: TemplateInterface): Option<string> => {
        return {
          value: x.repositoryUrl,
          label: x.name,
        };
      }
    );

    const outputFolderFromArgument: string =
      process.argv[CreateWorkleap.NAME_PARAMETER_POSITION];

    if (outputFolderFromArgument) {
      Output.Write(`${outputFolderFromArgument} project setup`, Color.gray);
    }

    const outputFolderPromptResult =
      outputFolderFromArgument ??
      (await this.prompt.Text(
        "How should we name the project?",
        CreateWorkleap.DEFAULT_OUTPUT_FOLDER,
        CreateWorkleap.DEFAULT_OUTPUT_FOLDER
      ));

    const templatePromptResult = await this.prompt.Select<string>(
      "Select the template to download",
      availableTemplates
    );

    const template = Templates.find(
      (x) => x.repositoryUrl === templatePromptResult
    ) as TemplateInterface;

    const config: Configuration = {
      template,
      options: {
        outputFolder: outputFolderPromptResult,
        templateSpecificOptions: {},
        toReplace: [],
      },
    };

    for (const option of template.options) {
      const variableName = ConfigurationBuilder.ExtractVariableName(
        option.flag
      );
      config.options.templateSpecificOptions[variableName] =
        await this.prompt.Text(option.question);
    }

    return config;
  }

  private AddListeners(aggregator: Aggregator): void {
    aggregator.LoaderEvent.addListener(LoaderStartCloningEventName, () => {
      this.loaderSpinner.Start();
    });

    aggregator.LoaderEvent.addListener(LoaderStopCloningEventName, () => {
      this.loaderSpinner.Stop();
    });

    aggregator.LoaderEvent.addListener(GeneratorStartEventName, () => {
      this.generatorSpinner.Start();
    });

    aggregator.LoaderEvent.addListener(GeneratorStopEventName, () => {
      this.generatorSpinner.Stop();
    });
  }
}
