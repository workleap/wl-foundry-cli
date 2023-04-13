import { Output } from "../../src/prompts";

describe("Given Output module", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("When call write Then work", () => {
    const consoleMock = jest.spyOn(console, "log").mockImplementation();

    Output.Write("Hello");

    expect(consoleMock).toHaveBeenCalled();
  });
});
