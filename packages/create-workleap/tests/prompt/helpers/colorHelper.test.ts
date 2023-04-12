import { Color, ColorHelper } from "../../../src/prompts/helpers/colorHelper";

const TerminalColorCodes: {
    [x: string]: string;
} = {
    Black: "\x1b[30m",
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Magenta: "\x1b[35m",
    Cyan: "\x1b[36m",
    White: "\x1b[37m",
    Gray: "\x1b[90m",
    RESET: "\x1b[39m",
};

const message = "message";

describe("Given ColorHelper", () => {
    test("When no color Then work", () => {
        expect(ColorHelper(message)).toBe(message);
    });

    it.each([
        ["Black", Color.black],
        ["Red", Color.red],
        ["Green", Color.green],
        ["Yellow", Color.yellow],
        ["Blue", Color.blue],
        ["Magenta", Color.magenta],
        ["Cyan", Color.cyan],
        ["White", Color.white],
        ["Gray", Color.gray],
    ])("When '%s' color Then Work", (name, color) => {
        expect(ColorHelper(message, color)).toBe(
            `${TerminalColorCodes[name]}${message}${TerminalColorCodes.RESET}`
        );
    });
});