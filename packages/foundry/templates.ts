import path from "path";
import { OptionValues } from "@commander-js/extra-typings";

import { AddToReplace } from "./generator";

const BASE_REPOSITORY_ADDRESS = "Workleap/wl-foundry-cli/templates";

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

const GetName = (outputDirectory: string): string => {
  return path.basename(outputDirectory);
};

const GetScope = (options: Options, flagName: string): string => {
  const scope = options[flagName];

  return scope ? `${scope.toString()}/` : "";
};

export const Templates: { [key: string]: TemplateInterface } = {
  "host-application": {
    description: "use the host-application template",
    repositoryUrl: `${BASE_REPOSITORY_ADDRESS}/host-application`,
    options: [
      {
        flag: "--package-scope <string>",
        description: "package scope",
      },
    ],
    action: (options) => {
      const scope = GetScope(options, "packageScope");
      const name = GetName(options.outDir);

      AddToReplace("**/package.json", { PACKAGE_SCOPE: scope, NAME: name });
      AddToReplace("**/@apps/host", { PACKAGE_SCOPE: scope, NAME: name });
      AddToReplace("README.md", { PACKAGE_SCOPE: scope, NAME: name });

      return options;
    },
  },
  "remote-module": {
    description: "use the remote-module template",
    repositoryUrl: `${BASE_REPOSITORY_ADDRESS}/remote-module`,
    options: [
      {
        flag: "--host-scope <string>",
        description: "host scope",
      },
    ],
    action: (options) => {
      const scope = GetScope(options, "hostScope");
      const name = GetName(options.outDir);

      AddToReplace("**", { HOST_SCOPE: scope, NAME: name });

      return options;
    },
  },
  "static-module": {
    description: "use the static-module template",
    repositoryUrl: `${BASE_REPOSITORY_ADDRESS}/static-module`,
    options: [
      {
        flag: "--host-scope <string>",
        description: "host scope",
      },
    ],
    action: (options) => {
      const scope = GetScope(options, "hostScope");
      const name = GetName(options.outDir);

      AddToReplace("**", { HOST_SCOPE: scope, NAME: name });

      return options;
    },
  },
};
