import { Loader } from "./loader";
import { Generate } from "./generate";

export * from "./generator";
export * from "./templates";
export const LoaderStartCloningEventName = Loader.StartCloningEventName;
export const LoaderStopCloningEventName = Loader.StopCloningEventName;
export const GeneratorStartEventName = Generate.StartEventName;
export const GeneratorStopEventName = Generate.StopEventName;
