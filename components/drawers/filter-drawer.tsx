"use client";

import type React from "react";
import { CloseIcon } from "@/assets/resources/icons";
import { CustomButton } from "@/components/base/custom-button";
import { CustomPillButton } from "@/components/base/custom-pill";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { actionButtonStyle, iconWrapperStyles } from "@/lib/common-styles";

type FilterDrawerProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title?: string;
	description?: string;
	children: React.ReactNode;
	onReset: () => void;
	resetLabel?: string;
	doneLabel?: string;
};

export function FilterDrawer({
	open,
	onOpenChange,
	title = "Filters",
	description = "Changes apply straight away.",
	children,
	onReset,
	resetLabel = "Clear filters",
	doneLabel = "Done",
}: FilterDrawerProps) {
	return (
		<Drawer open={open} onOpenChange={onOpenChange} direction="bottom">
			<DrawerContent className="mx-auto w-full max-w-sm pb-0 before:mx-2 before:rounded-4xl data-[vaul-drawer-direction=bottom]:bottom-2 data-[vaul-drawer-direction=bottom]:max-w-lg">
				<DrawerHeader className="flex flex-row items-center justify-between gap-2 border-b border-gray-200/50 px-6 py-3">
					<div className="text-start">
						<DrawerTitle className="font-heading text-lg font-semibold sm:text-xl">{title}</DrawerTitle>
						<DrawerDescription className="text-sm text-slate-500">{description}</DrawerDescription>
					</div>
					<DrawerClose asChild>
						<CustomButton
							aria-label="Close filters"
							rightIcon={<CloseIcon />}
							rightIconClassName={iconWrapperStyles(
								"bg-primary/20 p-1.5 text-primary transition duration-300 ease hover:bg-primary/10",
							)}
						/>
					</DrawerClose>
				</DrawerHeader>
				<div className="no-scrollbar scroll-fade-y max-h-[60vh] overflow-y-auto px-6 py-4">{children}</div>
				<DrawerFooter className="grid grid-cols-2 gap-4 px-6 pb-4">
					<CustomButton onClick={onReset} className={actionButtonStyle("h-max py-3 text-sm", "outline")}>
						{resetLabel}
					</CustomButton>
					<CustomButton onClick={() => onOpenChange(false)} className={actionButtonStyle("h-max py-3 text-sm")}>
						{doneLabel}
					</CustomButton>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

type FilterSectionProps<T extends string> = {
	label: string;
	options: readonly { value: T; label: string }[];
	value: T;
	onChange: (value: T) => void;
	disabled?: boolean;
};

export function FilterSection<T extends string>({ label, options, value, onChange, disabled }: FilterSectionProps<T>) {
	return (
		<fieldset className="space-y-2">
			<legend className="text-xs font-semibold text-zinc-500 uppercase">{label}</legend>
			<div className="flex flex-wrap gap-1.5">
				{options.map((option) => (
					<CustomPillButton
						key={option.value}
						label={option.label}
						isActive={value === option.value}
						onClick={() => onChange(option.value)}
						disabled={disabled}
						className="px-3 py-1.5 text-xs"
					/>
				))}
			</div>
		</fieldset>
	);
}
