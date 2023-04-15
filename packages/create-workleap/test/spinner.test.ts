import { StartSpinner, StopSpinner } from "../spinner";

import * as prompts from "@clack/prompts";

jest.mock("@clack/prompts");

describe("Given Spinner module", () => {
  const startSpinnerMock = jest.fn<string, string[], void>();
  const stopSpinnerMock = jest.fn<string, string[], void>();

  const spinnerMock = jest.spyOn(prompts, "spinner").mockImplementation(() => {
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

    StartSpinner(spinnerTitle);
    StopSpinner(spinnerTitle);

    expect(spinnerMock).toHaveBeenCalled();
    expect(startSpinnerMock).toHaveBeenCalledWith(spinnerTitle);
    expect(stopSpinnerMock).toHaveBeenCalledWith(spinnerTitle);
  });

  test("When stop a not started spinner Then do nothing", () => {
    const spinnerTitle = "spinner title...";

    StopSpinner(spinnerTitle);

    expect(spinnerMock).not.toHaveBeenCalled();
    expect(startSpinnerMock).not.toHaveBeenCalled();
    expect(stopSpinnerMock).not.toHaveBeenCalled();
  });
});
