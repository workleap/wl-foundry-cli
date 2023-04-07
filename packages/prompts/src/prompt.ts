import {
  isCancel,
  cancel,
  intro,
  outro,
  text,
  confirm,
  select,
  multiselect,
} from "@clack/prompts";
import { Color, ColorHelper } from "./helpers/colorHelper";

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

export class Prompt {
  private static readonly DEFAULT_CANCEL_MESSAGE: string =
    "Operation cancelled.";

  constructor(message?: string, color?: Color) {
    if (message) {
      intro(ColorHelper(message, color ?? Color.cyan));
    }
  }

  async Text(
    message: string,
    placeholder?: string,
    defaultValue?: string,
    customCancelMessage?: string,
    color?: Color
  ): Promise<string> {
    const value = await text({
      message: ColorHelper(message, color),
      placeholder,
      defaultValue,
    });

    if (isCancel(value)) {
      cancel(customCancelMessage ?? Prompt.DEFAULT_CANCEL_MESSAGE);
      process.exit(0);
    }

    return value;
  }

  async Confirm(
    message: string,
    initialValue?: boolean,
    customCancelMessage?: string,
    color?: Color
  ): Promise<boolean> {
    const value = await confirm({
      message: ColorHelper(message, color),
      initialValue,
    });

    if (isCancel(value)) {
      cancel(customCancelMessage ?? Prompt.DEFAULT_CANCEL_MESSAGE);
      process.exit(0);
    }

    return value;
  }

  async Select<T>(
    message: string,
    options: Option<T>[],
    initialValue?: T,
    customCancelMessage?: string,
    color?: Color
  ): Promise<T> {
    const value = await select<Option<T>[], T>({
      message: ColorHelper(message, color),
      options,
      initialValue,
    });

    if (isCancel(value)) {
      cancel(customCancelMessage ?? Prompt.DEFAULT_CANCEL_MESSAGE);
      process.exit(0);
    }

    return value;
  }

  async MultiSelect<T>(
    message: string,
    options: Option<T>[],
    initialValues?: T[],
    customCancelMessage?: string,
    required?: boolean,
    color?: Color
  ): Promise<T[]> {
    const values = await multiselect<Option<T>[], T>({
      message: ColorHelper(message, color),
      options,
      initialValues,
      required,
    });

    if (isCancel(values)) {
      cancel(customCancelMessage ?? Prompt.DEFAULT_CANCEL_MESSAGE);
      process.exit(0);
    }

    return values;
  }

  Outro(message?: string, color?: Color): void {
    if (message) {
      outro(ColorHelper(message, color ?? Color.green));
    }
  }
}
