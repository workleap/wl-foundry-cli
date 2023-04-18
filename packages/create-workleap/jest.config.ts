import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  testRegex: "/tests/*/.*\\.test\\.ts$",
  transform: {
    "^.+\\.ts$": "@swc/jest",
  },
};

export default config;
