import * as fse from "fs-extra";

import { cloneProjectTemplate } from "../src/cloneProjectTemplate";

jest.mock("fs-extra");

const cloneMock = jest.fn<string, string[], void>();

jest.mock("degit", () => () => ({
    clone: (...args: string[]) => cloneMock(...args)
}));

describe("loadTemplate", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("when called with valid argument, template is cloned", async () => {
        const outputDirectory = "./test";
        const repositoryUrl = "foo/bar";

        await cloneProjectTemplate(outputDirectory, repositoryUrl);

        expect(fse.ensureDir).toHaveBeenCalledWith(outputDirectory);
        expect(cloneMock).toHaveBeenCalledWith(outputDirectory);
    });
});
