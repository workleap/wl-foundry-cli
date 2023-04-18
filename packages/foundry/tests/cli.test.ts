import process from "process";

import { runCli } from "../src/cli";

const nodeDefaultArgv = ["node.js", "foundry"];

describe("Given CLI", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it.each([
        ["host-application", "--package-scope"],
        ["remote-module", "--host-scope"],
        ["static-module", "--host-scope"]
    ])("Given existing command '%s' Then work", (command, scopeOptionTag) => {
        const outputDirectory = "foo";

        process.argv = [
            ...nodeDefaultArgv,
            command,
            "-o",
            outputDirectory,
            scopeOptionTag,
            "@bar"
        ];

        const configuration = runCli();

        expect(configuration).not.toBeNull();
        expect(configuration.outputDirectory).toMatch(outputDirectory);
        expect(configuration.repositoryUrl).toMatch(command);
    });

    test("Given not existing command Then exit process with error", () => {
        const command = "not-a-real-command";

        jest.spyOn(process, "exit").mockImplementation();
        jest.spyOn(process.stderr, "write").mockImplementation();

        process.argv = [...nodeDefaultArgv, command];

        runCli();

        expect(process.exit).toHaveBeenCalledWith(1);
        expect(process.stderr.write).toHaveBeenCalled();
    });
});
