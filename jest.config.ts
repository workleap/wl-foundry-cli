import type { Config } from "jest";

const config: Config = {
    projects: [
        "<rootDir>/packages/*"
    ],
    testRegex: "/tests/*/.*\\.test\\.ts$",
    testPathIgnorePatterns: ["/node_modules/", "/dist/", "/templates/"],
    cacheDirectory: "./node_modules/.cache/jest",
    clearMocks: true,
    verbose: true
};

export default config;
