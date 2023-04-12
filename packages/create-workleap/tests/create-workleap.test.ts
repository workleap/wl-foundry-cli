import {
    Generator,
    Templates,
    TemplateInterface,
    Configuration,
    LoaderStartCloningEventName,
    LoaderStopCloningEventName,
    GeneratorStartEventName,
    GeneratorStopEventName,
} from "@workleap/foundry";

import { CreateWorkleap } from "../src/create-workleap";

jest.mock("@workleap/foundry");

describe("Given CreateWorkleap", () => {
    test("When Then", async () => {
        const createWorkleap = new CreateWorkleap();
        await createWorkleap.Run();

        expect(Prompts.Prompt).toHaveBeenCalled();
        expect(Loader).toHaveBeenCalled();
        expect(Generator).toHaveBeenCalled();
    });
});