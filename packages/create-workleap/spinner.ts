import { spinner } from "@clack/prompts";

const DEFAULT_SPINNER_MESSAGE = "Running...";
let SPINNER_INSTANCE: {
  start: (message: string) => void;
  stop: (message: string) => void;
};

const SPINNER = () => {
  if (SPINNER_INSTANCE == null) {
    SPINNER_INSTANCE = spinner();
  }

  return SPINNER_INSTANCE;
};

let _spinnerIsStarted = false;
export const StartSpinner = (title?: string) => {
  if (_spinnerIsStarted) {
    return;
  }

  SPINNER().start(title ?? DEFAULT_SPINNER_MESSAGE);

  _spinnerIsStarted = true;

  return;
};

export const StopSpinner = (title?: string) => {
  if (!_spinnerIsStarted) {
    return;
  }

  SPINNER().stop(title ?? DEFAULT_SPINNER_MESSAGE);

  _spinnerIsStarted = true;

  return;
};
