import swcConfig from "./swc.dev.js";

const config = {
    transform: {
        "^.+\\.(t|j)sx?$": ["@swc/jest", swcConfig]
    },
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    extensionsToTreatAsEsm: [".ts", ".tsx"],
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
