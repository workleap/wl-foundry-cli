import process from "node:process";
import { swcConfig } from "./swc.jest.ts";

const config = {
    transform: {
        "^.+\\.(t|j)sx?$": ["@swc/jest", swcConfig]
    },
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    extensionsToTreatAsEsm: [".ts"],
    reporters: [["default", {}]]
};

if (process.argv.includes("--ci")) {
    config.reporters.push(["jest-junit", {
        outputDirectory: "reports",
        outputName: "jest-junit.xml",
        ancestorSeparator: " › ",
        uniqueOutputName: "false",
        suiteNameTemplate: "{filepath}",
        classNameTemplate: "{classname}",
        titleTemplate: "{title}"
    }]);
}

export default config;
