import { Spinner } from "../../src/prompts";

import * as prompts from "@clack/prompts";

jest.mock("@clack/prompts");

describe("Given Spinner module", () => {
    const startSpinnerMock = jest.fn<string, string[], void>();
    const stopSpinnerMock = jest.fn<string, string[], void>();

    const spinnerMock = jest
        .spyOn(prompts, "spinner")
        .mockImplementation(() => {
            return {
                start: startSpinnerMock,
                stop: stopSpinnerMock,
            };
        });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("When start and stop Then work", () => {
        const spinnerTitle = "spinner title...";

        const spin = new Spinner(spinnerTitle);

        spin.Start();
        spin.Stop();

        expect(spinnerMock).toHaveBeenCalled();
        expect(startSpinnerMock).toHaveBeenCalledWith(spinnerTitle);
        expect(stopSpinnerMock).toHaveBeenCalledWith(spinnerTitle);
    });

    test("When stop a not started spinner Then do nothing", () => {
        const spinnerTitle = "spinner title...";

        const spin = new Spinner(spinnerTitle);

        spin.Stop();

        expect(spinnerMock).toHaveBeenCalled();
        expect(startSpinnerMock).not.toHaveBeenCalled();
        expect(stopSpinnerMock).not.toHaveBeenCalled();
    });
});