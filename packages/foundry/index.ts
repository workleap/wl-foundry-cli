import * as process from "process";
import { ensureDir } from "fs-extra";
import degit from "degit";

import { Generate } from "./generator";
import { Configuration, RunCli } from "./cli";

const LoadTemplate = async (config: Configuration): Promise<void> => {
  await ensureDir(config.outputDirectory);

  const runner = degit(config.repositoryUrl);
  await runner.clone(config.outputDirectory);
};

const Main = async (): Promise<void> => {
  const config: Configuration = RunCli();

  await LoadTemplate(config);

  await Generate(config.outputDirectory);
};

Main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
