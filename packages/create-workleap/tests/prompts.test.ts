import {
  Option,
  intro,
  text,
  confirm,
  select,
  multiSelect,
  outro,
  note,
} from "../src/prompts";

import * as prompts from "@clack/prompts";

jest.mock("@clack/prompts");

describe("Given Prompt.Intro", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("When no message Then do nothing", () => {
    intro();

    expect(prompts.intro).not.toHaveBeenCalled();
  });

  test("When message Then work", () => {
    const introText = "Intro";

    intro(introText);

    expect(prompts.intro).toHaveBeenCalledTimes(1);
    expect(prompts.intro).toHaveBeenCalledWith(
      expect.stringContaining(introText)
    );
  });
});

describe("Given Prompt.Note", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("When no message Then work", () => {
    note();

    expect(prompts.note).toHaveBeenCalled();
  });

  test("When message Then work", () => {
    note("Hello");

    expect(prompts.note).toHaveBeenCalled();
  });
});

describe("Given Prompt.Text", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each([
    ["Text Message", undefined, undefined],
    ["Text Message", "Text PlaceHolder", undefined],
    ["Text Message", "Text PlaceHolder", "Default Value"],
  ])(
    "When message is '%s', placeholder is '%s' and default value is '%s' Then work",
    async (message, placeholder, defaultValue) => {
      const inputValue = "InputValue";
      buildTextResult(inputValue);

      const result = await text(message, placeholder, defaultValue);

      expect(prompts.text).toHaveBeenCalledTimes(1);
      expect(prompts.text).toHaveBeenCalledWith({
        message,
        placeholder,
        defaultValue,
      });
      expect(prompts.isCancel).toBeCalledTimes(1);
      expect(prompts.cancel).toBeCalledTimes(0);

      expect(result).toBe(inputValue);
    }
  );

  test("When text is cancel Then cancel message is called", async () => {
    const message = "Text Message";
    shouldCancel();

    const mockExit = jest.spyOn(process, "exit").mockImplementation();

    await text(message);

    expect(prompts.text).toBeCalledTimes(1);
    expect(prompts.isCancel).toBeCalledTimes(1);
    expect(prompts.cancel).toBeCalledTimes(1);
    expect(mockExit).toBeCalledTimes(1);
  });

  test("When text is cancel with a custom message Then cancel message is called", async () => {
    const message = "Text Message";
    const customCancelMessage = "Custom Cancel Message";
    shouldCancel();

    const mockExit = jest.spyOn(process, "exit").mockImplementation();

    await text(message, undefined, undefined, customCancelMessage);

    expect(prompts.text).toBeCalledTimes(1);
    expect(prompts.isCancel).toBeCalledTimes(1);
    expect(prompts.cancel).toBeCalledTimes(1);
    expect(prompts.cancel).toBeCalledWith(customCancelMessage);
    expect(mockExit).toBeCalledTimes(1);
  });

  const buildTextResult = (result: string): void => {
    jest
      .spyOn(prompts, "text")
      .mockImplementation(async () => Promise.resolve(result));
  };

  const shouldCancel = (): void => {
    jest.spyOn(prompts, "isCancel").mockImplementation(() => true);
  };
});

describe("Given Prompt.Confirm", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each([
    ["Confirm Message", undefined],
    ["Confirm Message", true],
  ])(
    "When message is '%s' and initialValue is '%s' Then work",
    async (message, initialValue) => {
      const inputValue = true;
      buildConfirmResult(inputValue);

      const result = await confirm(message, initialValue);

      expect(prompts.confirm).toHaveBeenCalledTimes(1);
      expect(prompts.confirm).toHaveBeenCalledWith({
        message,
        initialValue,
      });
      expect(prompts.isCancel).toBeCalledTimes(1);
      expect(prompts.cancel).toBeCalledTimes(0);

      expect(result).toBe(inputValue);
    }
  );

  test("When confirm is cancel Then cancel message is called", async () => {
    const message = "Confirm Message";
    shouldCancel();

    const mockExit = jest.spyOn(process, "exit").mockImplementation();

    await confirm(message);

    expect(prompts.confirm).toBeCalledTimes(1);
    expect(prompts.isCancel).toBeCalledTimes(1);
    expect(prompts.cancel).toBeCalledTimes(1);
    expect(mockExit).toBeCalledTimes(1);
  });

  test("When confirm is cancel with a custom message Then cancel message is called", async () => {
    const message = "Confirm Message";
    const customCancelMessage = "Custom Cancel Message";

    shouldCancel();

    const mockExit = jest.spyOn(process, "exit").mockImplementation();

    await confirm(message, undefined, customCancelMessage);

    expect(prompts.confirm).toBeCalledTimes(1);
    expect(prompts.isCancel).toBeCalledTimes(1);
    expect(prompts.cancel).toBeCalledTimes(1);
    expect(prompts.cancel).toBeCalledWith(customCancelMessage);
    expect(mockExit).toBeCalledTimes(1);
  });

  const buildConfirmResult = (result: boolean): void => {
    jest
      .spyOn(prompts, "confirm")
      .mockImplementation(async () => Promise.resolve(result));
  };

  const shouldCancel = (): void => {
    jest.spyOn(prompts, "isCancel").mockImplementation(() => true);
  };
});

describe("Given Prompt.Select", () => {
  const options: Option<string>[] = [
    { value: "Value1", label: "Label 1", hint: "Hint 1" },
    { value: "Value2", label: "Label 2", hint: "Hint 2" },
    { value: "Value3", label: "Label 3", hint: "Hint 3" },
  ];

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each([
    ["Select Message", undefined],
    ["Select Message", options[1]],
  ])(
    "When message is '%s', placeholder is '%s' and default value is '%s' Then work",
    async (message, initialValue) => {
      const inputValue = options[0].value;
      buildSelectResult(inputValue);

      const result = await select(message, options, initialValue?.value);

      expect(prompts.select).toHaveBeenCalledTimes(1);
      expect(prompts.select).toHaveBeenCalledWith({
        message,
        options,
        initialValue: initialValue?.value,
      });
      expect(prompts.isCancel).toBeCalledTimes(1);
      expect(prompts.cancel).toBeCalledTimes(0);

      expect(result).toBe(inputValue);
    }
  );

  test("When select is cancel Then cancel message is called", async () => {
    const message = "Select Message";
    shouldCancel();

    const mockExit = jest.spyOn(process, "exit").mockImplementation();

    await select(message, options);

    expect(prompts.select).toBeCalledTimes(1);
    expect(prompts.isCancel).toBeCalledTimes(1);
    expect(prompts.cancel).toBeCalledTimes(1);
    expect(mockExit).toBeCalledTimes(1);
  });

  test("When select is cancel with a custom message Then cancel message is called", async () => {
    const message = "Select Message";
    const customCancelMessage = "Custom Cancel Message";
    shouldCancel();

    const mockExit = jest.spyOn(process, "exit").mockImplementation();

    await select(message, options, undefined, customCancelMessage);

    expect(prompts.select).toBeCalledTimes(1);
    expect(prompts.isCancel).toBeCalledTimes(1);
    expect(prompts.cancel).toBeCalledTimes(1);
    expect(prompts.cancel).toBeCalledWith(customCancelMessage);
    expect(mockExit).toBeCalledTimes(1);
  });

  const buildSelectResult = (result: string): void => {
    jest
      .spyOn(prompts, "select")
      .mockImplementation(async () => Promise.resolve(result));
  };

  const shouldCancel = (): void => {
    jest.spyOn(prompts, "isCancel").mockImplementation(() => true);
  };
});

describe("Given Prompt.MultiSelect", () => {
  const options: Option<string>[] = [
    { value: "Value1", label: "Label 1", hint: "Hint 1" },
    { value: "Value2", label: "Label 2", hint: "Hint 2" },
    { value: "Value3", label: "Label 3", hint: "Hint 3" },
  ];

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each([
    ["Multiselect Message", undefined],
    ["Multiselect Message", options[1]],
  ])(
    "When message is '%s', placeholder is '%s' and default value is '%s' Then work",
    async (message, initialValue) => {
      const inputValues = [options[0].value, options[2].value];
      buildMultiSelectResult(inputValues);

      const result = await multiSelect(message, options, [initialValue?.value]);

      expect(prompts.multiselect).toHaveBeenCalledTimes(1);
      expect(prompts.multiselect).toHaveBeenCalledWith({
        message,
        options,
        initialValues: [initialValue?.value],
      });
      expect(prompts.isCancel).toBeCalledTimes(1);
      expect(prompts.cancel).toBeCalledTimes(0);

      expect(result).toBe(inputValues);
    }
  );

  test("When multiselect is cancel Then cancel message is called", async () => {
    const message = "Multiselect Message";
    shouldCancel();

    const mockExit = jest.spyOn(process, "exit").mockImplementation();

    await multiSelect(message, options);

    expect(prompts.multiselect).toBeCalledTimes(1);
    expect(prompts.isCancel).toBeCalledTimes(1);
    expect(prompts.cancel).toBeCalledTimes(1);
    expect(mockExit).toBeCalledTimes(1);
  });

  test("When multiselect is cancel with a custom message Then cancel message is called", async () => {
    const message = "Multiselect Message";
    const customCancelMessage = "Custom Cancel Message";
    shouldCancel();

    const mockExit = jest.spyOn(process, "exit").mockImplementation();

    await multiSelect(message, options, undefined, customCancelMessage);

    expect(prompts.multiselect).toBeCalledTimes(1);
    expect(prompts.isCancel).toBeCalledTimes(1);
    expect(prompts.cancel).toBeCalledTimes(1);
    expect(prompts.cancel).toBeCalledWith(customCancelMessage);
    expect(mockExit).toBeCalledTimes(1);
  });

  test("When multiselect is required Then work", async () => {
    const message = "Multiselect Message";
    const inputValues = [options[0].value, options[2].value];
    buildMultiSelectResult(inputValues);

    const result = await multiSelect(
      message,
      options,
      undefined,
      undefined,
      true
    );

    expect(prompts.multiselect).toHaveBeenCalledTimes(1);
    expect(prompts.multiselect).toHaveBeenCalledWith({
      message,
      options,
      initialValues: undefined,
      required: true,
    });
    expect(prompts.isCancel).toBeCalledTimes(1);
    expect(prompts.cancel).toBeCalledTimes(0);

    expect(result).toBe(inputValues);
  });

  const buildMultiSelectResult = (results: string[]): void => {
    jest
      .spyOn(prompts, "multiselect")
      .mockImplementation(async () => Promise.resolve(results));
  };

  const shouldCancel = (): void => {
    jest.spyOn(prompts, "isCancel").mockImplementation(() => true);
  };
});

describe("Given Prompt.Outro", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("When no message Then is not called", () => {
    outro();

    expect(prompts.outro).not.toHaveBeenCalled();
  });

  test("When message Then work", () => {
    const outroText = "Outro";

    outro(outroText);

    expect(prompts.outro).toHaveBeenCalledTimes(1);
    expect(prompts.outro).toHaveBeenCalledWith(
      expect.stringContaining(outroText)
    );
  });
});
