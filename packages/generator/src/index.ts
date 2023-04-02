import {FileSystem} from "./fileSystem";

export interface ReplacePattern {
    from: RegExp,
    to: string
}

export interface ReplaceInFile {
    src: string,
    patterns: ReplacePattern[]
}

export class Generator {
    async Run(tasks: ReplaceInFile[]): Promise<void> {
        for (const task of tasks) {
            await FileSystem.Replace(task.src, task.patterns);
        }
    }
}