import * as child_process from "child_process";
import process from "process";

import { Intro, Select, Note, Text, Outro } from "./prompts";
import * as pkg from "./package.json";
import { StartSpinner, StopSpinner } from "./spinner";

const DEFAULT_OUTPUT_DIRECTORY = "./my-new-project";
const NAME_PARAMETER_POSITION = 2; // TODO validate position of parameter once ask with `pnpm create`

const FOUNDRY_CMD = "foundry";

const AskForOutputDirectoryAsync = async (): Promise<string> => {
  const outputDirectoryFromArgument: string =
    process.argv[NAME_PARAMETER_POSITION];

  if (outputDirectoryFromArgument) {
    Note(`${outputDirectoryFromArgument} project setup`);
  }

  return (
    outputDirectoryFromArgument ??
    (await Text(
      "Where should we create the project?",
      DEFAULT_OUTPUT_DIRECTORY,
      DEFAULT_OUTPUT_DIRECTORY
    ))
  );
};

const AskForTemplateAsync = (): Promise<string> => {
  const templates = [
    { value: "host-application" },
    { value: "remote-module" },
    { value: "static-module" },
  ];

  return Select<string>("Select the template to create", templates);
};

const AskForScopeAsync = (template: string): Promise<string> => {
  return Text(
    `What should be the ${template} scope?`,
    "Press enter if no scope is needed."
  );
};

const CallFoundryAsync = async (
  outputDirectory: string,
  template: string,
  scope: string
): Promise<number> => {
  const options = [template];

  if (outputDirectory) {
    options.push("-o", outputDirectory);
  }

  if (scope) {
    if (template == "host-application") {
      options.push("--package-scope", scope);
    } else {
      options.push("--host-scope", scope);
    }
  }

  const childProcess = child_process.spawn(FOUNDRY_CMD, options, {
    cwd: process.cwd(),
    shell: true,
  });

  return new Promise((resolve) => {
    childProcess.stdout.on("data", (x: string): void => {
      process.stdout.write(x.toString());
    });
    childProcess.stderr.on("data", (x: string): void => {
      process.stderr.write(x.toString());
      process.exit(1);
    });
    childProcess.on("exit", (code?: number): void => {
      resolve(code ?? 0);
    });
  });
};

const Main = async (): Promise<void> => {
  Intro(pkg.name);

  const outputDirectory = await AskForOutputDirectoryAsync();

  const template = await AskForTemplateAsync();

  const scope = await AskForScopeAsync(template);

  StartSpinner();
  await CallFoundryAsync(outputDirectory, template, scope);
  StopSpinner();

  Outro("Done!");
};

Main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
