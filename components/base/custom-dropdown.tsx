"use client";

import type React from "react";
import { twMerge } from "cn";
import { CheckIcon } from "@/assets/resources/icons";
import { CustomButton } from "@/components/base/custom-button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type DropdownEntry =
	| {
			type?: "item";
			label: string;
			icon?: React.ReactNode;
			selected?: boolean;
			onClick?: () => void;
			href?: string;
			variant?: "default" | "destructive" | "primary";
			itemClassName?: string;
			disabled?: boolean;
	  }
	| { type: "separator" }
	| { type: "label"; content: React.ReactNode };

const variantStyles = {
	default: "hover:bg-gray-100",
	destructive: "text-red-600 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-600",
	primary: "text-primary hover:bg-primary/10",
} as const;

type CustomDropdownProps = {
	trigger: React.ReactNode;
	entries: DropdownEntry[];
	align?: "start" | "center" | "end";
	contentClassName?: string;
	disabled?: boolean;
};

export function CustomDropdown({ trigger, entries, align = "end", contentClassName, disabled }: CustomDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild disabled={disabled}>
				{trigger}
			</DropdownMenuTrigger>
			<DropdownMenuContent align={align} className={twMerge("mt-2 min-w-48 font-medium shadow-sm ring-gray-200", contentClassName)}>
				{entries.map((entry, index) => {
					if (entry.type === "separator") return <DropdownMenuSeparator key={`separator-${index}`} />;
					if (entry.type === "label") return <DropdownMenuLabel key={`label-${index}`}>{entry.content}</DropdownMenuLabel>;
					const linkProps = entry.href ? { as: "link" as const, href: entry.href } : { onClick: entry.onClick };
					return (
						<DropdownMenuItem
							key={entry.label}
							asChild
							disabled={entry.disabled}
							className={twMerge("w-full justify-start py-2", variantStyles[entry.variant ?? "default"], entry.itemClassName)}>
							<CustomButton
								{...linkProps}
								leftIcon={entry.icon}
								leftIconClassName="text-lg"
								rightIcon={entry.selected ? <CheckIcon /> : undefined}
								disabled={entry.disabled}
								className={twMerge("text-sm", entry.selected && "font-medium text-primary")}>
								{entry.label}
							</CustomButton>
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
