module.exports = {
    testEnvironment: "node",
    testRegex: "/tests/*/.*\\.test\\.ts$",
    transform: {
        "^.+\\.ts$": "@swc/jest",
    },
};