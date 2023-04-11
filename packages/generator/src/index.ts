import { Loader } from "./loader";
import { Generator } from "./generate";

export * from "./aggregator";
export * from "./templates";
export const LoaderStartCloningEventName = Loader.StartCloningEventName;
export const LoaderStopCloningEventName = Loader.StopCloningEventName;
export const GeneratorStartEventName = Generator.StartEventName;
export const GeneratorStopEventName = Generator.StopEventName;
