import { Color, ColorHelper } from "./helpers/colorHelper";

export class Output {
  static Write(message: string, color?: Color): void {
    console.log(ColorHelper(`|  ${message}`, color));
  }
}
