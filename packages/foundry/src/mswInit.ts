import child_process from "child_process";

export async function mswInit(publicDirPath: string) {
    const childProcess = child_process.exec(`pnpm dlx msw init ${publicDirPath} --save`);

    return new Promise<number>(resolve => {
        childProcess.on("error", error => {
            console.error(error);
            resolve(1);
        });
        childProcess.stderr?.on("data", (x: string): void => {
            console.error(x);
            resolve(1);
        });
        childProcess.on("exit", code => {
            resolve(code ?? 0);
        });
    });
}
