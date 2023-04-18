import { TemplateInterface, Templates } from "../src/templates";

describe("Given Templates", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it.each(Object.entries(Templates))(
        "Given %s Then all option first letter are lowercase",
        (key: string, template: TemplateInterface) => {
            for (const option of template.options) {
                const description = option.description ?? [];
                const firstLetter = description[0] ?? "";

                expect(firstLetter).toEqual(firstLetter.toLowerCase());
            }
        }
    );
});
