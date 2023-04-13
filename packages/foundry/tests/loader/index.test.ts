import { Loader } from "../../src/loader";

import * as fs from "fs/promises";

jest.mock("fs/promises");

const cloneMock = jest.fn<string, string[], void>();

jest.mock("degit", () => () => ({
  clone: (...args: string[]) => cloneMock(...args),
}));

describe("Given Loader", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("When load with existing destination repository Then work", async () => {
    const fakeCloneDestination = "fake/path";

    const loader = new Loader("fake/repo");

    await loader.Clone(fakeCloneDestination);

    expect(true).toBeTruthy();

    expect(cloneMock).toHaveBeenCalledWith(fakeCloneDestination);

    expect(fs.access).toHaveBeenCalled();
    expect(fs.mkdir).not.toHaveBeenCalled();
  });

  test("When load with new destination repository Then create folder and work", async () => {
    const fakeCloneDestination = "fake/path";

    jest.spyOn(fs, "access").mockRejectedValue(new Error());

    const loader = new Loader("fake/repo");

    await loader.Clone(fakeCloneDestination);

    expect(true).toBeTruthy();

    expect(cloneMock).toHaveBeenCalledWith(fakeCloneDestination);

    expect(fs.access).toHaveBeenCalled();
    expect(fs.mkdir).toHaveBeenCalled();
  });
});
