import * as fs from "node:fs/promises";
import * as glob from "glob";
import { replaceTokens } from "../src/replaceTokens";

import { join } from "path";

jest.mock("node:fs/promises");
jest.mock("glob");

const fakeFilePatternList = ["foo.bar", "hello/**"];
const fakeFileList = ["foo.bar", "hello/world.txt", "hello/mr/anderson.txt"];
const fakeReplaceValueList = { "FOO": "bar", "PING": "pong" };

afterEach(() => {
    jest.restoreAllMocks();
});

test("when no files, do nothing", async () => {
    await replaceTokens([], fakeReplaceValueList, ".");

    expect(glob.glob).not.toHaveBeenCalled();
    expect(fs.readFile).not.toHaveBeenCalled();
    expect(fs.writeFile).not.toHaveBeenCalled();
});

test("when no value to replace, do nothing", async () => {
    await replaceTokens(fakeFilePatternList, {}, ".");

    expect(glob.glob).not.toHaveBeenCalled();
    expect(fs.readFile).not.toHaveBeenCalled();
    expect(fs.writeFile).not.toHaveBeenCalled();
});

test("when pattern match no file, do no file system io", async () => {
    jest.spyOn(glob, "glob").mockImplementation(async () => []);

    await replaceTokens(fakeFilePatternList, fakeReplaceValueList, ".");

    expect(glob.glob).toHaveBeenCalled();
    expect(fs.readFile).not.toHaveBeenCalled();
    expect(fs.writeFile).not.toHaveBeenCalled();
});

test("when pattern match files, variables are replaced", async () => {
    jest.spyOn(glob, "glob").mockImplementation(async () => fakeFileList);
    jest.spyOn(fs, "readFile").mockImplementation(async () => (
        `{
            "name": "{{FOO}}/{{PING}}",
            "version": "0.0.0",
            "private": true,
            "dependencies": {}
        }`
    ));

    await replaceTokens(fakeFilePatternList, fakeReplaceValueList, ".");

    const replacedContent = `{
            "name": "bar/pong",
            "version": "0.0.0",
            "private": true,
            "dependencies": {}
        }`;

    expect(fs.writeFile).toHaveBeenCalledWith("foo.bar", replacedContent);
    expect(fs.writeFile).toHaveBeenCalledWith(join("hello", "world.txt"), replacedContent);
    expect(fs.writeFile).toHaveBeenCalledWith(join("hello", "mr", "anderson.txt"), replacedContent);
});

test("when files detected with no variables inside, do nothing", async () => {
    const content =
        `{
            "name": "allo",
            "version": "0.0.0",
            "private": true,
            "dependencies": {}
        }`;
    jest.spyOn(glob, "glob").mockImplementation(async () => fakeFileList);
    jest.spyOn(fs, "readFile").mockImplementation(async () => content);

    await replaceTokens(fakeFilePatternList, fakeReplaceValueList, ".");

    expect(fs.writeFile).toHaveBeenCalledWith("foo.bar", content);
    expect(fs.writeFile).toHaveBeenCalledWith(join("hello", "world.txt"), content);
    expect(fs.writeFile).toHaveBeenCalledWith(join("hello", "mr", "anderson.txt"), content);
});

test("when files detected with unknown variable, do nothing", async () => {
    const content =
        `{
            "name": "{{COUCOU}}",
            "version": "0.0.0",
            "private": true,
            "dependencies": {}
        }`;
    jest.spyOn(glob, "glob").mockImplementation(async () => fakeFileList);
    jest.spyOn(fs, "readFile").mockImplementation(async () => content);

    await replaceTokens(fakeFilePatternList, fakeReplaceValueList, ".");

    expect(fs.writeFile).toHaveBeenCalledWith("foo.bar", content);
    expect(fs.writeFile).toHaveBeenCalledWith(join("hello", "world.txt"), content);
    expect(fs.writeFile).toHaveBeenCalledWith(join("hello", "mr", "anderson.txt"), content);
});
