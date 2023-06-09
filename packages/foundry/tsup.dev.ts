import { defineDevConfig } from "@workleap/tsup-configs";

export default defineDevConfig({
    entry: ["src/bin.ts"],
    platform: "node",
    ignoreWatch: ["tests"]
});
