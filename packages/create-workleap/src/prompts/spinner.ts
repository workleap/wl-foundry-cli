import {spinner} from "@clack/prompts";

export class Spinner {
    private static readonly DEFAULT_SPINNER_MESSAGE: string = "Running...";

    private readonly _message: string;
    private readonly _spinner: {
        start: (message: string) => void;
        stop: (message: string) => void;
    };

    private _isStarted = false;

    constructor(message?: string) {
        this._message = message ?? Spinner.DEFAULT_SPINNER_MESSAGE;

        this._spinner = spinner();
    }

    Start(): Spinner {
        if (this._isStarted) {
            return this;
        }

        this._spinner.start(this._message);

        this._isStarted = true;

        return this;
    }

    Stop(): Spinner {
        if (!this._isStarted) {
            return this;
        }

        this._spinner.stop(this._message);

        this._isStarted = false;

        return this;
    }
}
