import { SpinnerVariant1 } from "./spinner-variant-1";
import { SpinnerVariant2 } from "./spinner-variant-2";
import { SpinnerVariant3 } from "./spinner-variant-3";

export { SpinnerVariant1 } from "./spinner-variant-1";
export { SpinnerVariant2 } from "./spinner-variant-2";
export { SpinnerVariant3 } from "./spinner-variant-3";

export const SPINNER_VARIANTS = {
	1: SpinnerVariant1,
	2: SpinnerVariant2,
	3: SpinnerVariant3,
} as const;

export type SpinnerVariantKey = keyof typeof SPINNER_VARIANTS;
