import * as child_process from "child_process";
import process from "process";
import * as util from "util";

import {Intro, Select, Output, Text, Outro} from "./prompts";
import * as pkg from "./package.json";
import {StartSpinner, StopSpinner} from "./spinner";

const DEFAULT_OUTPUT_DIRECTORY = "./my-new-project";
const NAME_PARAMETER_POSITION = 2; // TODO validate position of parameter once ask with `pnpm create`

const FOUNDRY_CMD = "foundry";

const AskForOutputDirectoryAsync = async (): Promise<string> => {
  const outputDirectoryFromArgument: string =
    process.argv[NAME_PARAMETER_POSITION];

  if (outputDirectoryFromArgument) {
    Output(`${outputDirectoryFromArgument} project setup`);
  }

  return (
    outputDirectoryFromArgument ??
    (await Text(
      "Where should we create the project?",
      DEFAULT_OUTPUT_DIRECTORY,
      DEFAULT_OUTPUT_DIRECTORY
    )));
};

const AskForTemplateAsync = (): Promise<string> => {
  const templates = [
    {value: "host-application"},
    {value: "remote-module"},
    {value: "static-module"}
  ];

  return Select<string>("Select the template to create", templates);
};

const AskForScopeAsync = (template: string): Promise<string> => {
  return Text(`What should be the ${template} scope?`, "Press enter if no scope is needed.")
};

const CallFoundryAsync = async (outputDirectory: string, template: string, scope: string): Promise<unknown> => {
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

  const spawnAsPromise = util.promisify(child_process.spawn);
  return spawnAsPromise(FOUNDRY_CMD, options, {cwd: process.cwd()});
};

const Main = async (): Promise<void> => {
  Intro(pkg.name);

  const outputDirectory = await AskForOutputDirectoryAsync();

  const template = await AskForTemplateAsync();

  const scope = await AskForScopeAsync(template);

  StartSpinner();
  await CallFoundryAsync(outputDirectory, template, scope);
  StopSpinner();

  Outro("Done!")
};

Main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });