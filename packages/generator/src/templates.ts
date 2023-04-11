import { Options } from "./generator";

export interface TemplateInterface {
  name: string;
  description: string;
  repositoryUrl: string;
  options: {
    flag: string;
    question: string;
    description?: string;
    defaultValue?: string | boolean | [] | string[] | undefined;
  }[];
  action?: (options: Options) => Promise<Options>;
}

const BaseRepositoryAddress = "Workleap/wl-foundry-cli/templates";

export const Templates: TemplateInterface[] = [
  {
    name: "host-application",
    description: "Use the host-application template",
    repositoryUrl: `${BaseRepositoryAddress}/host-application`,
    options: [
      {
        flag: "--package-scope <string>",
        question: "What should be the host-application scope?",
        description: "Package scope",
      },
    ],
    action: async (options) => {
      options.toReplace.push({
        src: "package.json",
        patterns: [
          {
            from: /<%scope%>\//,
            to: options.templateSpecificOptions["packageScope"]
              ? `${options.templateSpecificOptions[
                  "packageScope"
                ]?.toString()}/`
              : "",
          },
        ],
      });

      // Fake the async
      await Promise.resolve();

      return options;
    },
  },
  {
    name: "remote-module",
    description: "Use the remote-module template",
    repositoryUrl: `${BaseRepositoryAddress}/remote-module`,
    options: [
      {
        flag: "--host-scope <string>",
        question: "What should be the remote-module scope?",
        description: "Host scope",
      },
    ],
    action: async (options) => {
      options.toReplace.push({
        src: "package.json",
        patterns: [
          {
            from: /<%scope%>/,
            to: options.templateSpecificOptions["hostScope"]?.toString() ?? "",
          },
        ],
      });

      // Fake the async
      await Promise.resolve();

      return options;
    },
  },
  {
    name: "static-module",
    description: "Use the static-module template",
    repositoryUrl: `${BaseRepositoryAddress}/static-module`,
    options: [
      {
        flag: "--host-scope <string>",
        question: "What should be the static-module scope?",
        description: "Host scope",
      },
    ],
    action: async (options) => {
      options.toReplace.push({
        src: "package.json",
        patterns: [
          {
            from: /<%scope%>/,
            to: options.templateSpecificOptions["hostScope"]?.toString() ?? "",
          },
        ],
      });

      // Fake the async
      await Promise.resolve();

      return options;
    },
  },
];
