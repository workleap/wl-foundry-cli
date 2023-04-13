import CommanderHelper from "./helpers/commanderHelper";
import { Templates } from "../templates";

const terminal = new CommanderHelper();

export class Cli {
  constructor() {
    this.AddPluginsToCli();
  }

  async Run() {
    await terminal.ParseAsync();
  }

  private AddPluginsToCli() {
    for (const template in Templates) {
      terminal.AddPlugin(template, Templates[template]);
    }
  }
}
