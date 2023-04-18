import path from "path";
import { OptionValues } from "@commander-js/extra-typings";

import { addToReplace } from "./generator";

const BaseRepositoryAddress = "Workleap/wl-foundry-cli/templates";

export interface Options extends OptionValues {
  outDir: string;
}

export interface TemplateInterface {
  description: string;
  repositoryUrl: string;
  options: {
    flag: string;
    description?: string;
    defaultValue?: string | boolean | [] | string[] | undefined;
  }[];
  action?: (options: Options) => Options;
}

const getName = (outputDirectory: string): string => {
  return path.basename(outputDirectory);
};

const getScope = (options: Options, flagName: string): string => {
  const scope = options[flagName];

  return scope ? `${scope.toString()}/` : "";
};

export const Templates: { [key: string]: TemplateInterface } = {
  "host-application": {
    description: "use the host-application template",
    repositoryUrl: `${BaseRepositoryAddress}/host-application`,
    options: [
      {
        flag: "--package-scope <string>",
        description: "package scope",
      },
    ],
    action: (options) => {
      const scope = getScope(options, "packageScope");
      const name = getName(options.outDir);

      addToReplace("**/package.json", { PACKAGE_SCOPE: scope, NAME: name });
      addToReplace("**/@apps/host", { PACKAGE_SCOPE: scope, NAME: name });
      addToReplace("README.md", { PACKAGE_SCOPE: scope, NAME: name });

      return options;
    },
  },
  "remote-module": {
    description: "use the remote-module template",
    repositoryUrl: `${BaseRepositoryAddress}/remote-module`,
    options: [
      {
        flag: "--host-scope <string>",
        description: "host scope",
      },
    ],
    action: (options) => {
      const scope = getScope(options, "hostScope");
      const name = getName(options.outDir);

      addToReplace("**", { HOST_SCOPE: scope, NAME: name });

      return options;
    },
  },
  "static-module": {
    description: "use the static-module template",
    repositoryUrl: `${BaseRepositoryAddress}/static-module`,
    options: [
      {
        flag: "--host-scope <string>",
        description: "host scope",
      },
    ],
    action: (options) => {
      const scope = getScope(options, "hostScope");
      const name = getName(options.outDir);

      addToReplace("**", { HOST_SCOPE: scope, NAME: name });

      return options;
    },
  },
};
