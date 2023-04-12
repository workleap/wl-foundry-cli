import pc from "picocolors";

export enum Color {
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
}

export const ColorHelper = (message: string, color?: Color): string => {
  switch (color) {
    case Color.black:
      return pc.black(message);
    case Color.red:
      return pc.red(message);
    case Color.green:
      return pc.green(message);
    case Color.yellow:
      return pc.yellow(message);
    case Color.blue:
      return pc.blue(message);
    case Color.magenta:
      return pc.magenta(message);
    case Color.cyan:
      return pc.cyan(message);
    case Color.white:
      return pc.white(message);
    case Color.gray:
      return pc.gray(message);
    default:
      return message;
  }
};
