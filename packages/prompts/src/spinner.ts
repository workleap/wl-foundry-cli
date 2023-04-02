import {spinner} from '@clack/prompts';

export class Spinner {
    private static readonly DEFAULT_SPINNER_MESSAGE: string = "Running...";

    private readonly _message: string;
    private readonly _spinner: { start: (message: string) => void, stop: (message: string) => void };

    constructor(message?: string) {
        this._message = message ?? Spinner.DEFAULT_SPINNER_MESSAGE;

        this._spinner = spinner();
    }

    Start(): Spinner {
        this._spinner.start(this._message);

        return this;
    }

    Stop(): Spinner {
        this._spinner.stop(this._message);

        return this;
    }
}