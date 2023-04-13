interface PromptsMock {
  isCancel: () => boolean;
  cancel: () => void;
  intro: () => void;
  outro: () => void;
  text: () => Promise<string>;
  confirm: () => Promise<boolean>;
  select: <T>() => Promise<T[]>;
  multiselect: <T>() => Promise<T>;
  spinner: (message: string) => {
    start: () => void;
    stop: () => void;
  };
}

const prompts = jest.createMockFromModule<PromptsMock>("@clack/prompts");

prompts.isCancel = jest.fn();
prompts.cancel = jest.fn();
prompts.intro = jest.fn();
prompts.outro = jest.fn();
prompts.text = jest.fn();
prompts.confirm = jest.fn();
prompts.select = jest.fn();
prompts.multiselect = jest.fn();
prompts.spinner = jest.fn(() => {
  return {
    start: jest.fn(),
    stop: jest.fn(),
  };
});

module.exports = prompts;
