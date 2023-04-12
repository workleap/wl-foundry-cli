import * as process from "process";
import {
  Generator,
  Templates,
  Configuration,
  LoaderStartCloningEventName,
  LoaderStopCloningEventName,
  GeneratorStartEventName,
  GeneratorStopEventName,
} from "@workleap/foundry";

import { Color, Option, Output, Prompt, Spinner } from "./prompts";
import { ConfigurationBuilder } from "./prompts/helpers/configurationBuilder";

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

    const generator = new Generator(config);

    this.AddListeners(generator);

    await generator.Run();

    this.prompt.Outro("Done!");
  }

  private async Configure(): Promise<Configuration> {
    const availableTemplates: Option<string>[] = [];
    for (const template in Templates) {
      availableTemplates.push({ value: template, label: template });
    }

    const outputFolderFromArgument: string =
      process.argv[CreateWorkleap.NAME_PARAMETER_POSITION];

    if (outputFolderFromArgument) {
      Output.Write(`${outputFolderFromArgument} project setup`, Color.gray);
    }

    const outputFolderPromptResult =
      outputFolderFromArgument ??
      (await this.prompt.Text(
        "Where should we create the project?",
        CreateWorkleap.DEFAULT_OUTPUT_FOLDER,
        CreateWorkleap.DEFAULT_OUTPUT_FOLDER
      ));

    const templatePromptResult = await this.prompt.Select<string>(
      "Select the template to create",
      availableTemplates
    );

    const template = Templates[templatePromptResult];

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

  private AddListeners(generator: Generator): void {
    generator.LoaderEvent.addListener(LoaderStartCloningEventName, () => {
      this.loaderSpinner.Start();
    });

    generator.LoaderEvent.addListener(LoaderStopCloningEventName, () => {
      this.loaderSpinner.Stop();
    });

    generator.LoaderEvent.addListener(GeneratorStartEventName, () => {
      this.generatorSpinner.Start();
    });

    generator.LoaderEvent.addListener(GeneratorStopEventName, () => {
      this.generatorSpinner.Stop();
    });
  }
}
