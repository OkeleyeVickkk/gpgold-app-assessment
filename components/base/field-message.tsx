import type { ReactNode } from "react";
import { twMerge } from "cn";

type FieldMessageProps = {
	id: string;
	error?: string;
	hint?: ReactNode;
	className?: string;
};

export const FieldMessage = ({ id, error, hint, className }: FieldMessageProps) => {
	if (!error && !hint) return null;

	return (
		<p id={id} className={twMerge("text-xs mt-2 font-medium", error ? "text-red-600" : "text-slate-600", className)}>
			{error ?? hint}
		</p>
	);
};
