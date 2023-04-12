import * as fs from "fs/promises";

jest.mock("fs/promises");

import { FileSystem } from "../../src/generate/fileSystem";
import { ReplacePattern } from "../../src/generate";

describe("Given FileSystem.Rename", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("When rename Then work", async () => {
    const oldPath = "from";
    const newPath = "to";

    await FileSystem.Rename(oldPath, newPath);

    expect(fs.rename).toHaveBeenCalled();
    expect(fs.rename).toHaveBeenCalledWith(oldPath, newPath);
  });

  test("When rename fail Then throw", async () => {
    const oldPath = "from";
    const newPath = "to";

    jest.spyOn(fs, "rename").mockRejectedValue(new Error());

    await expect(FileSystem.Rename(oldPath, newPath)).rejects.toThrow();
  });
});

describe("Given FileSystem.Move", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("When destination folder exist Then work", async () => {
    const src = "from";
    const newPath = "to";

    await FileSystem.Move(src, newPath);

    expect(fs.access).toHaveBeenCalled();
    expect(fs.mkdir).not.toHaveBeenCalled();
    expect(fs.rename).toHaveBeenCalled();
  });

  test("When destination folder dont exist Then make the folder", async () => {
    const src = "from";
    const newPath = "to";

    jest.spyOn(fs, "access").mockRejectedValue(new Error());

    await FileSystem.Move(src, newPath);

    expect(fs.access).toHaveBeenCalled();
    expect(fs.mkdir).toHaveBeenCalled();
    expect(fs.rename).toHaveBeenCalled();
  });
});

describe("Given FileSystem.Replace", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("When replace pattern in file Then work", async () => {
    const filePath = "package.json";
    const baseText = "name: @<%base%>/<%name%>";
    const patterns: ReplacePattern[] = [
      { from: /<%base%>/, to: "workleap" },
      { from: /<%name%>/, to: "test" },
    ];
    const expectedResult = "name: @workleap/test";

    jest
      .spyOn(fs, "readFile")
      .mockImplementation(() => Promise.resolve(Buffer.from(baseText, "utf8")));
    jest.spyOn(fs, "writeFile").mockImplementation();

    await FileSystem.Replace(filePath, patterns);

    expect(fs.access).toHaveBeenCalled();
    expect(fs.readFile).toHaveBeenCalled();
    expect(fs.writeFile).toHaveBeenCalledWith(filePath, expectedResult);
  });

  test("When no pattern Then do nothing", async () => {
    await FileSystem.Replace("file.path", []);

    expect(fs.access).not.toHaveBeenCalled();
    expect(fs.readFile).not.toHaveBeenCalled();
    expect(fs.writeFile).not.toHaveBeenCalled();
  });
});
