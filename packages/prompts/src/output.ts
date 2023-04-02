import {Color, ColorHelper} from "./helpers/colorHelper";
import * as console from "console";

export class Output {
    Write(message: string, color?: Color) {
        console.log(ColorHelper(message, color));
    }
}