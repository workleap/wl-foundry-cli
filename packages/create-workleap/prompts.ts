import {
  isCancel,
  cancel,
  intro,
  outro,
  text,
  confirm,
  select,
  multiselect,
  note,
} from "@clack/prompts";
import pc from "picocolors";

const DEFAULT_CANCEL_MESSAGE = "Operation cancelled.";

type Primitive = Readonly<string | boolean | number>;
export type Option<Value> = Value extends Primitive
  ? {
      value: Value;
      label?: string;
      hint?: string;
    }
  : {
      value: Value;
      label: string;
      hint?: string;
    };

export const Intro = (title?: string) => {
  if (title) {
    intro(title);
  }
};

export const Note = (message?: string): void => {
  note(message);
};

export const Text = async (
  message: string,
  placeholder?: string,
  defaultValue?: string,
  customCancelMessage?: string
): Promise<string> => {
  const value = await text({
    message,
    placeholder,
    defaultValue,
  });

  if (isCancel(value)) {
    cancel(customCancelMessage ?? DEFAULT_CANCEL_MESSAGE);
    process.exit(0);
  }

  return value;
};

export const Confirm = async (
  message: string,
  initialValue?: boolean,
  customCancelMessage?: string
): Promise<boolean> => {
  const value = await confirm({
    message,
    initialValue,
  });

  if (isCancel(value)) {
    cancel(customCancelMessage ?? DEFAULT_CANCEL_MESSAGE);
    process.exit(0);
  }

  return value;
};

export const Select = async <T>(
  message: string,
  options: Option<T>[],
  initialValue?: T,
  customCancelMessage?: string
): Promise<T> => {
  const value = await select<Option<T>[], T>({
    message,
    options,
    initialValue,
  });

  if (isCancel(value)) {
    cancel(customCancelMessage ?? DEFAULT_CANCEL_MESSAGE);
    process.exit(0);
  }

  return value;
};

export const MultiSelect = async <T>(
  message: string,
  options: Option<T>[],
  initialValues?: T[],
  customCancelMessage?: string,
  required?: boolean
): Promise<T[]> => {
  const values = await multiselect<Option<T>[], T>({
    message,
    options,
    initialValues,
    required,
  });

  if (isCancel(values)) {
    cancel(customCancelMessage ?? DEFAULT_CANCEL_MESSAGE);
    process.exit(0);
  }

  return values;
};

export const Outro = (message?: string): void => {
  if (message) {
    outro(pc.green(message));
  }
};
