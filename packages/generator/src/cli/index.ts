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
    Templates.forEach((plugin) => {
      terminal.AddPlugin(plugin);
    });
  }
}
