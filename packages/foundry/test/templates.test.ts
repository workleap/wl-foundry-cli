import { TemplateInterface, Templates } from "../templates";

describe("Given Templates", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each(Object.entries(Templates))(
    "Given %s Then all option first letter are lowercase",
    (key: string, template: TemplateInterface) => {
      for (const option of template.options) {
        if (option.description) {
          const firstLetter = option.description[0];

          expect(firstLetter).toEqual(firstLetter.toLowerCase());
        }
      }
    }
  );
});
