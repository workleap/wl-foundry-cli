import events from "events";

import { FileSystem } from "./fileSystem";

export interface ReplacePattern {
  from: RegExp;
  to: string;
}

export interface ReplaceInFile {
  src: string;
  patterns: ReplacePattern[];
}

export class Generator {
  public static readonly StartEventName = "start";
  public static readonly StopEventName = "stop";

  public readonly generatorEvent: events.EventEmitter;

  constructor() {
    this.generatorEvent = new events.EventEmitter();
  }

  async Run(tasks: ReplaceInFile[]): Promise<void> {
    this.generatorEvent.emit(Generator.StartEventName);
    for (const task of tasks) {
      await FileSystem.Replace(task.src, task.patterns);
    }
    this.generatorEvent.emit(Generator.StopEventName);
  }
}
