import * as fse from "fs-extra";

import { cloneProjectTemplate } from "../src/cloneProjectTemplate.js";

jest.mock("fs-extra");

const cloneMock = jest.fn<string, string[], void>();

jest.mock("degit", () => () => ({
    clone: (...args: string[]) => cloneMock(...args)
}));

describe("loadTemplate", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("When called with valid argument Then work", async () => {
        const outputDirectory = "./test";
        const repositoryUrl = "foo/bar";

        await cloneProjectTemplate(outputDirectory, repositoryUrl);

        expect(fse.ensureDir).toHaveBeenCalledWith(outputDirectory);
        expect(cloneMock).toHaveBeenCalledWith(repositoryUrl);
    });
});
