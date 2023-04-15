import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  testRegex: "/test/*/.*\\.test\\.ts$",
  transform: {
    "^.+\\.ts$": "@swc/jest",
  },
};

export default config;
