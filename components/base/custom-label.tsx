import type React from "react";
import { labelStyle } from "@/lib/common-styles";

type CustomLabelProps = React.ComponentProps<"label"> & {
	required?: boolean;
};

export const CustomLabel = ({ className, children, required, ...props }: CustomLabelProps) => (
	<label className={labelStyle(className)} {...props}>
		<span className="flex flex-nowrap text-nowrap gap-1">
			{children}
			{required && (
				<span aria-hidden="true" className="text-red-600 font-extrabold">
					*
				</span>
			)}
		</span>
	</label>
);
