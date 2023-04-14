import {Options} from "./generator";

export interface TemplateInterface {
  description: string;
  repositoryUrl: string;
  options: {
    flag: string;
    description?: string;
    defaultValue?: string | boolean | [] | string[] | undefined;
  }[];
  action?: (options: Options) => Promise<Options>;
}

const BaseRepositoryAddress = "Workleap/wl-foundry-cli/templates";

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
    action: async (options) => {
      const scope = options.templateSpecificOptions["packageScope"]
        ? `${options.templateSpecificOptions["packageScope"]?.toString()}/`
        : "";

      options.toReplace.push({
        src: "package.json", patterns: [{from: /<%scope%>\//, to: scope,},],
      });

      options.toReplace.push({
        src: "README.md", patterns: [{from: /<%scope%>\//, to: scope,},],
      });

      // Fake the async
      await Promise.resolve();

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
    action: async (options) => {
      const scope = options.templateSpecificOptions["hostScope"]
        ? `${options.templateSpecificOptions["hostScope"]?.toString()}/`
        : "";

      options.toReplace.push({
        src: "package.json", patterns: [{from: /<%scope%>/, to: scope,},],
      });

      options.toReplace.push({
        src: "README.md", patterns: [{from: /<%scope%>/, to: scope,},],
      });

      // Fake the async
      await Promise.resolve();

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
    action: async (options) => {
      const scope = options.templateSpecificOptions["hostScope"]
        ? `${options.templateSpecificOptions["hostScope"]?.toString()}/`
        : "";

      options.toReplace.push({
        src: "package.json", patterns: [{from: /<%scope%>/, to: scope},],
      });

      options.toReplace.push({
        src: "README.md", patterns: [{from: /<%scope%>/, to: scope},],
      });

      // Fake the async
      await Promise.resolve();

      return options;
    },
  },
};
