import * as process from "process";

import { Configuration, runCli } from "./cli";
import { loadTemplate } from "./loadTemplate";
import { generator } from "./generator";

const main = async (): Promise<void> => {
  const config: Configuration = runCli();

  await loadTemplate(config);

  await generator(config.outputDirectory);
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
