import * as path from "node:path";
import * as fs from "node:fs/promises";
import * as glob from "glob";
import * as handlebars from "handlebars";

import { replaceTokens } from "../src/replaceTokens";

jest.mock("node:fs/promises");
jest.mock("node:path");
jest.mock("glob");
jest.mock("handlebars");

const fakeFilePatternList = ["foo.bar", "hello/**"];

const fakeFileList = ["foo.bar", "hello/world.txt", "hello/mr/anderson.txt"];

const fakeReplaceValueList = { "FOO": "bar", "PING": "pong" };

describe("replaceTokens", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("when no files, do nothing", async () => {
        await replaceTokens([], fakeReplaceValueList, ".");

        expect(path.join).not.toHaveBeenCalled();
        expect(glob.glob).not.toHaveBeenCalled();
        expect(fs.readFile).not.toHaveBeenCalled();
        expect(fs.writeFile).not.toHaveBeenCalled();
        expect(handlebars.compile).not.toHaveBeenCalled();
    });

    test("when no value to replace, do nothing", async () => {
        await replaceTokens(fakeFilePatternList, {}, ".");

        expect(path.join).not.toHaveBeenCalled();
        expect(glob.glob).not.toHaveBeenCalled();
        expect(fs.readFile).not.toHaveBeenCalled();
        expect(fs.writeFile).not.toHaveBeenCalled();
        expect(handlebars.compile).not.toHaveBeenCalled();
    });

    test("when pattern match no file, do no file system io", async () => {
        jest.spyOn(glob, "glob").mockImplementation(async () => []);

        await replaceTokens(fakeFilePatternList, fakeReplaceValueList, ".");

        expect(glob.glob).toHaveBeenCalled();
        expect(path.join).not.toHaveBeenCalled();
        expect(fs.readFile).not.toHaveBeenCalled();
        expect(fs.writeFile).not.toHaveBeenCalled();
        expect(handlebars.compile).not.toHaveBeenCalled();
    });

    test("when pattern match files, variables are replaced", async () => {
        jest.spyOn(glob, "glob").mockImplementation(async () => fakeFileList);
        jest.spyOn(fs, "readFile").mockImplementation(async () => "");
        jest.spyOn(handlebars, "compile").mockImplementation(() => jest.fn());

        await replaceTokens(fakeFilePatternList, fakeReplaceValueList, ".");

        expect(glob.glob).toHaveBeenCalled();
        expect(path.join).toHaveBeenCalled();
        expect(fs.readFile).toHaveBeenCalled();
        expect(fs.writeFile).toHaveBeenCalled();
        expect(handlebars.compile).toHaveBeenCalled();
    });
});
