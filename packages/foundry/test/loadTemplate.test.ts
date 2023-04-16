import fse from "fs-extra";

import { LoadTemplate } from "../loadTemplate";
import { Configuration } from "../cli";

jest.mock("fs-extra");

const cloneMock = jest.fn<string, string[], void>();

jest.mock("degit", () => () => ({
  clone: (...args: string[]) => cloneMock(...args),
}));

const fakeConfiguration: Configuration = {
  outputDirectory: "noWhere",
  repositoryUrl: "no/where",
};

describe("Given LoadTemplate", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("When Then", async () => {
    await LoadTemplate(fakeConfiguration);

    expect(fse.ensureDir).toHaveBeenCalled();
    expect(cloneMock).toHaveBeenCalled();
  });
});
