import type { Config } from "jest";

const config: Config = {
    testEnvironment: "node",
    testRegex: "/tests/*/.*\\.test\\.ts$",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    transform: {
        "^.+\\.ts$": "@swc/jest"
    }
};

export default config;
