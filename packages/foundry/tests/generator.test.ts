import * as handlebars from "handlebars";
import * as fse from "fs-extra";
import * as Glob from "glob";

jest.mock("handlebars");
jest.mock("fs-extra");
jest.mock("glob");

import { addToReplace } from "../src/generator";

describe("Given Generator", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  test("When called Then work", async () => {
    const { generator } = require("../src/generator");

    const fileName = "foo.bar";

    addToReplace(fileName, {
      hello: "world",
    });

    jest.spyOn(fse, "readFile").mockImplementation(() => "fake content");
    jest.spyOn(handlebars, "compile").mockImplementation(() => jest.fn());
    jest.spyOn(Glob, "glob").mockImplementation(async () => {
      await Promise.resolve();
      return [fileName];
    });

    await generator("outputDirectory");

    expect(fse.readFile).toHaveBeenCalled();
    expect(fse.writeFile).toHaveBeenCalled();
    expect(handlebars.compile).toHaveBeenCalled();
  });

  test("When nothing to replace Then do nothing", async () => {
    const { generator } = require("../src/generator");

    await generator("outputDirectory");

    expect(fse.readFile).not.toHaveBeenCalled();
    expect(fse.writeFile).not.toHaveBeenCalled();
    expect(handlebars.compile).not.toHaveBeenCalled();
  });
});

describe("Given Generator.AddToReplace", () => {
  test("When called Then work", () => {
    const replacePattern = {
      foo: "foo",
      bar: "bar",
    };

    addToReplace("hello.world", replacePattern);
  });

  test("When file name is smaller then MIN_FILE_NAME_SIZE Then throw", () => {
    expect(() => addToReplace("", {})).toThrow();
  });
});
