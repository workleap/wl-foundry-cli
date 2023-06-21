import { HELLO, foo } from "./index.ts";

it("when read, the value of HELLO is known", () => {
    expect(HELLO).toEqual("World!");
});

it("when called, foo return bar", () => {
    const result = foo();

    expect(result).toEqual("bar");
});
