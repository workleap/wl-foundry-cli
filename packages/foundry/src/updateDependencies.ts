import { join } from "node:path";
import ncu from "npm-check-updates";

export const updateDependencies = async (outputDirectory: string) => {
    await ncu.run({
        packageFile: join(outputDirectory, "package.json"),
        upgrade: true,
        target: "minor"
    });
};
