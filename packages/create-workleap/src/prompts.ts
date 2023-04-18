import * as cp from "@clack/prompts";
import pc from "picocolors";

const DefaultCancelMessage = "Operation cancelled.";

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

export const intro = (title?: string) => {
    if (title) {
        cp.intro(title);
    }
};

export const note = (message?: string): void => {
    cp.note(message);
};

export const text = async (
    message: string,
    placeholder?: string,
    defaultValue?: string,
    customCancelMessage?: string
): Promise<string> => {
    const value = await cp.text({
        message,
        placeholder,
        defaultValue
    });

    if (cp.isCancel(value)) {
        cp.cancel(customCancelMessage ?? DefaultCancelMessage);
        process.exit(0);
    }

    return value;
};

export const confirm = async (
    message: string,
    initialValue?: boolean,
    customCancelMessage?: string
): Promise<boolean> => {
    const value = await cp.confirm({
        message,
        initialValue
    });

    if (cp.isCancel(value)) {
        cp.cancel(customCancelMessage ?? DefaultCancelMessage);
        process.exit(0);
    }

    return value;
};

export const select = async <T>(
    message: string,
    options: Option<T>[],
    initialValue?: T,
    customCancelMessage?: string
): Promise<T> => {
    const value = await cp.select<Option<T>[], T>({
        message,
        options,
        initialValue
    });

    if (cp.isCancel(value)) {
        cp.cancel(customCancelMessage ?? DefaultCancelMessage);
        process.exit(0);
    }

    return value;
};

export const multiSelect = async <T>(
    message: string,
    options: Option<T>[],
    initialValues?: T[],
    customCancelMessage?: string,
    required?: boolean
): Promise<T[]> => {
    const values = await cp.multiselect<Option<T>[], T>({
        message,
        options,
        initialValues,
        required
    });

    if (cp.isCancel(values)) {
        cp.cancel(customCancelMessage ?? DefaultCancelMessage);
        process.exit(0);
    }

    return values;
};

export const outro = (message?: string): void => {
    if (message) {
        cp.outro(pc.green(message));
    }
};
