import * as child_process from "child_process";
import process from "process";
import { spinner } from "@clack/prompts";

import { intro, select, note, text, outro } from "./prompts";
import * as pkg from "./package.json";

const DEFAULT_OUTPUT_DIRECTORY = "./my-new-project";
const NAME_PARAMETER_POSITION = 2; // TODO validate position of parameter once ask with `pnpm create`

const FOUNDRY_CMD = "foundry";

const askForOutputDirectoryAsync = async (): Promise<string> => {
  const outputDirectoryFromArgument: string =
    process.argv[NAME_PARAMETER_POSITION];

  if (outputDirectoryFromArgument) {
    note(`${outputDirectoryFromArgument} project setup`);
  }

  return (
    outputDirectoryFromArgument ??
    (await text(
      "Where should we create the project?",
      DEFAULT_OUTPUT_DIRECTORY,
      DEFAULT_OUTPUT_DIRECTORY
    ))
  );
};

const askForTemplateAsync = (): Promise<string> => {
  const templates = [
    { value: "host-application" },
    { value: "remote-module" },
    { value: "static-module" },
  ];

  return select<string>("Select the template to create", templates);
};

const askForScopeAsync = (template: string): Promise<string> => {
  return text(
    `What should be the ${template} scope?`,
    "Press enter if no scope is needed."
  );
};

const callFoundryAsync = async (
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

const main = async (): Promise<void> => {
  intro(pkg.name);

  const outputDirectory = await askForOutputDirectoryAsync();

  const template = await askForTemplateAsync();

  const scope = await askForScopeAsync(template);

  const loader = spinner();
  loader.start("Generating...");
  await callFoundryAsync(outputDirectory, template, scope);
  loader.stop("Generated!");

  outro("Done!");
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
