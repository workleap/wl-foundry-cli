import degit from "degit";
import { access, mkdir, constants } from "fs/promises";
import events from "events";

export class Loader {
  private static readonly DEFAULT_CONFIG: {
    cache: boolean;
    force: boolean;
    verbose: boolean;
  } = {
    cache: true,
    force: true,
    verbose: true,
  };

  public static readonly StartCloningEventName = "startCloning";
  public static readonly StopCloningEventName = "stopCloning";

  private readonly runner;

  public readonly loaderEvent: events.EventEmitter;

  constructor(repo: string) {
    this.runner = degit(repo, Loader.DEFAULT_CONFIG);

    this.loaderEvent = new events.EventEmitter();
  }

  async Clone(dest: string): Promise<void> {
    try {
      await access(dest, constants.R_OK | constants.W_OK);
    } catch {
      await mkdir(dest, {
        recursive: true,
        mode: constants.R_OK | constants.W_OK,
      });
    } finally {
      this.loaderEvent.emit(Loader.StartCloningEventName);
      await this.runner.clone(dest);
      this.loaderEvent.emit(Loader.StopCloningEventName);
    }
  }
}
