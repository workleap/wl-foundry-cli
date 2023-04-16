import * as process from "process";

import { Configuration, RunCli } from "./cli";
import { LoadTemplate } from "./loadTemplate";
import { Generator } from "./generator";

const Main = async (): Promise<void> => {
  const config: Configuration = RunCli();

  await LoadTemplate(config);

  await Generator(config.outputDirectory);
};

Main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
