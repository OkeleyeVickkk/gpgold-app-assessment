import type React from "react";
import { twMerge } from "cn";

export const CustomCard = ({ className, ...props }: React.ComponentProps<"div">) => (
	<div className={twMerge("bg-white border border-slate-100 rounded-xl", className)} {...props} />
);
