import { FileSystem } from "../../src/generate/fileSystem";

import { Generate, ReplaceInFile } from "../../src/generate";

jest.mock("../../src/generate/fileSystem");

describe("Given Generator", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("When multiple files to replace Then work", async () => {
    const replacePatterns: ReplaceInFile[] = [
      {
        src: "fileA",
        patterns: [{ from: /Hello/, to: "World" }],
      },
      {
        src: "fileB",
        patterns: [
          { from: /foo/, to: "Foo" },
          { from: /bar/, to: "Bar" },
        ],
      },
    ];

    const generate = new Generate();

    await generate.Run(replacePatterns);

    expect(FileSystem.Replace).toHaveBeenCalledTimes(2);
  });
});
