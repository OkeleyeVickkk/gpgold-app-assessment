"use client";

import type React from "react";
import { twMerge } from "cn";
import { CloseIcon, IconWrapper } from "@/assets/resources/icons";
import { CustomButton } from "@/components/base/custom-button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { iconWrapperStyles } from "@/lib/common-styles";

type ActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean };

type CustomModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description?: string;
	icon?: React.ReactNode;
	actionLabel?: string;
	cancelLabel?: string;
	onAction?: () => void;
	onCancel?: () => void;
	closeOnAction?: boolean;
	actionButtonProps?: ActionButtonProps;
	cancelButtonProps?: ActionButtonProps;
	className?: string;
	children?: React.ReactNode;
};

const footerButtonStyle = "active-scale w-full rounded-full py-3 text-sm font-medium shadow-none transition duration-300 ease-in-out";

export function CustomModal({
	open,
	onOpenChange,
	title,
	description,
	icon,
	actionLabel,
	cancelLabel,
	onAction,
	onCancel,
	closeOnAction = true,
	actionButtonProps,
	cancelButtonProps,
	className,
	children,
}: CustomModalProps) {
	function handleCancel() {
		onCancel?.();
		onOpenChange(false);
	}

	function handleAction() {
		onAction?.();
		if (closeOnAction) onOpenChange(false);
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				showCloseButton={false}
				className={twMerge(
					"no-scrollbar flex max-h-[88dvh] w-full flex-col gap-y-5 overflow-y-auto rounded-2xl bg-white p-0 sm:min-w-md md:max-h-[90dvh]",
					className,
				)}>
				<DialogHeader className="flex-row items-center justify-between gap-x-2 border-b border-gray-200/70 px-5 py-3.5 sm:px-6">
					<div className="flex items-center gap-2">
						{icon && <IconWrapper className="rounded-full bg-primary/20 p-2.5 text-2xl text-primary">{icon}</IconWrapper>}
						<div className="text-start">
							<DialogTitle className="font-heading text-lg font-semibold text-slate-900">{title}</DialogTitle>
							{description && (
								<DialogDescription className="text-xs text-slate-500 sm:text-sm font-medium!">{description}</DialogDescription>
							)}
						</div>
					</div>
					<DialogClose asChild>
						<CustomButton
							aria-label="Close"
							disabled={cancelButtonProps?.disabled}
							rightIcon={<CloseIcon />}
							rightIconClassName={iconWrapperStyles(
								"rounded-md bg-primary/20 p-1 text-primary transition duration-300 ease hover:bg-primary/10",
							)}
						/>
					</DialogClose>
				</DialogHeader>

				{children && <div className="no-scrollbar scroll-fade-y w-full overflow-y-auto px-5 pt-1 pb-2.5 sm:px-6">{children}</div>}

				{(actionLabel || cancelLabel) && (
					<DialogFooter className={twMerge("grid grid-cols-1 gap-3 px-5 pb-6 sm:px-6", cancelLabel && "sm:grid-cols-2")}>
						{cancelLabel && (
							<CustomButton
								onClick={handleCancel}
								{...cancelButtonProps}
								className={twMerge(
									footerButtonStyle,
									"border border-gray-200 bg-transparent text-gray-600 hover:bg-gray-50",
									cancelButtonProps?.className,
								)}>
								{cancelLabel}
							</CustomButton>
						)}
						{actionLabel && (
							<CustomButton
								onClick={handleAction}
								{...actionButtonProps}
								className={twMerge(footerButtonStyle, "bg-primary text-white hover:bg-primary-dark", actionButtonProps?.className)}>
								{actionLabel}
							</CustomButton>
						)}
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
}
