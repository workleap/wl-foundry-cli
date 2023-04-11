export class ConfigurationBuilder {
  private static readonly PARAMETER_FORM_COMMANDER_COMPATIBLE_OPTION_REGEX =
    /--([\w-]+)/;

  public static ExtractVariableName(str: string): string {
    const regex = this.PARAMETER_FORM_COMMANDER_COMPATIBLE_OPTION_REGEX;
    const variable = str.match(regex);

    if (variable == null || variable.length < 2) {
      throw new Error(`Can't parse the option "${str}"`);
    }

    return this.KebabToCamelCase(variable[1]);
  }

  private static KebabToCamelCase(str: string): string {
    return str.split("-").reduce((str, word) => {
      return str + word[0].toUpperCase() + word.slice(1);
    });
  }
}
