import handlebars from "handlebars";
import fse from "fs-extra";

jest.mock("handlebars");
jest.mock("fs-extra");

import { AddToReplace } from "../generator";

describe("Given Generator", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  test("When called Then work", async () => {
    const { Generator } = require("../generator");

    AddToReplace("foo.bar", {
      hello: "world",
    });

    jest.spyOn(fse, "readFile").mockImplementation(() => "fake content");
    jest.spyOn(handlebars, "compile").mockImplementation(() => jest.fn());

    await Generator("outputDirectory");

    expect(fse.readFile).toHaveBeenCalled();
    expect(fse.writeFile).toHaveBeenCalled();
    expect(handlebars.compile).toHaveBeenCalled();
  });

  test("When nothing to replace Then do nothing", async () => {
    const { Generator } = require("../generator");

    await Generator("outputDirectory");

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

    AddToReplace("hello.world", replacePattern);
  });

  test("When file name is smaller then MIN_FILE_NAME_SIZE Then throw", () => {
    expect(() => AddToReplace("", {})).toThrow();
  });
});
