import { twMerge } from "cn";

export const inputStyle = (style?: string) =>
	twMerge(
		"w-full px-4 py-2.5 bg-gray-50/50 border border-slate-200 text-sm sm:text-base rounded-lg ring-2 ring-transparent focus:ring-primary focus:border-primary/80 transition-all duration-300 ease-in-out ring-offset-2 outline-none placeholder:text-gray-400 placeholder:font-normal font-medium read-only:bg-gray-100 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
		style,
	);

export const labelStyle = (style?: string) => twMerge("font-medium text-sm sm:text-base block mb-1.5 select-none", style);

type ActionButtonVariant = "primary" | "outline" | "danger";

const actionButtonVariants: Record<ActionButtonVariant, string> = {
	primary: "bg-primary hover:bg-primary/90 text-primary-foreground",
	outline: "bg-transparent border border-gray-200 text-gray-700 hover:bg-gray-50",
	danger: "bg-red-600 hover:bg-red-700 text-white",
};

export const actionButtonStyle = (style?: string, variant: ActionButtonVariant = "primary") =>
	twMerge(
		"min-h-10 select-none text-sm sm:text-base font-semibold text-nowrap transition duration-300 ease-in-out py-2.5 px-5 rounded-full",
		actionButtonVariants[variant],
		style,
	);

export const pillButtonStyle = (style?: string) =>
	twMerge("min-h-10 px-4 py-2 text-sm font-medium text-nowrap rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50", style);

export const iconWrapperStyles = (style?: string) => twMerge("p-3 text-xl rounded-lg", style);
