import type React from "react";
import { twMerge } from "cn";
import { IconWrapper } from "@/assets/resources/icons";

import type { BadgeVariant } from "@/types/common.types";

export type { BadgeVariant };
type BadgeSize = "xs" | "sm" | "md";

const variantStyles: Record<BadgeVariant, string> = {
	primary: "bg-primary/10 text-primary",
	success: "bg-emerald-100 text-emerald-700",
	warning: "bg-amber-100 text-amber-800",
	danger: "bg-red-100 text-red-700",
	neutral: "bg-gray-100 text-gray-700",
};

const sizeStyles: Record<BadgeSize, string> = {
	xs: "px-2 py-0.5 text-[10px]",
	sm: "px-2 py-1 text-xs",
	md: "px-3 py-1 text-sm",
};

type CustomBadgeProps = {
	variant: BadgeVariant;
	label: string;
	icon?: React.ReactNode;
	size?: BadgeSize;
	className?: string;
};

export const CustomBadge = ({ variant, label, icon, size = "md", className }: CustomBadgeProps) => (
	<span className={twMerge("inline-flex items-center gap-x-1 rounded-full font-medium", variantStyles[variant], sizeStyles[size], className)}>
		{icon && <IconWrapper className="text-[1em]">{icon}</IconWrapper>}
		{label}
	</span>
);
