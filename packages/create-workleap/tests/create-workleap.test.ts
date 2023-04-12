import * as wf from "@workleap/foundry";
import * as prompts from "@clack/prompts";

import { CreateWorkleap } from "../src/create-workleap";

jest.mock("@workleap/foundry");
jest.mock("@clack/prompts");

describe("Given CreateWorkleap", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        jest.spyOn(prompts, "select").mockImplementation(async () => {
            await Promise.resolve();
            return "FakeTemplate"
        });
    });

    test("When Then", async () => {
        const createWorkleap = new CreateWorkleap();
        await createWorkleap.Run();

        expect(wf.Generator).toHaveBeenCalled();
        expect(prompts.intro).toHaveBeenCalled();
        expect(prompts.select).toHaveBeenCalled();
        expect(prompts.outro).toHaveBeenCalled();
    });
});