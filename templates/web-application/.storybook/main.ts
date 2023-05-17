import type { StorybookConfig } from "@storybook/react-webpack5";
import type  { Configuration } from "webpack";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-swc",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: (config) => {
    configureSvgrWebpack(config);

    return config;
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
};

function configureSvgrWebpack(config: Configuration) {
    if(!config.module?.rules) return config;

    // this modifies the existing image rule to exclude .svg files
    // since we want to handle those files with @svgr/webpack
    config.module.rules.forEach(rule => {
        if(
            typeof rule !== 'string' &&
            rule.test instanceof RegExp &&
            rule.test.test('.svg')) {
                rule.exclude = /\.svg$/i;
        }
      })

    // Configure .svg files to be loaded with @svgr/webpack
    config.module?.rules?.push({
        test: /\.svg$/,
        issuer: /\.(ts|tsx)$/i,
        use: ['@svgr/webpack'],
    });

    return config;
}


export default config;
