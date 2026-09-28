import type React from "react";
import { twMerge } from "cn";
import { CellularWifiNetworkIcon, IconWrapper, WarningTriangleIcon } from "@/assets/resources/icons";
import { CustomButton, type CustomButtonProps, type NavLinkRenderProps } from "@/components/base/custom-button";
import { TitleSubtitle } from "@/components/common/title-subtitle";
import { actionButtonStyle, iconWrapperStyles } from "@/lib/common-styles";

type EmptyStateProps = {
	title: string;
	description: string;
	icon?: React.ReactNode;
	iconClassName?: string;
	action?: CustomButtonProps;
	className?: string;
};

function resolveAction(action: CustomButtonProps): CustomButtonProps {
	if (action.as === "navlink") {
		const { className } = action;
		return {
			...action,
			className:
				typeof className === "function"
					? (navProps: NavLinkRenderProps) => actionButtonStyle(twMerge("mt-4 text-sm", className(navProps)))
					: actionButtonStyle(twMerge("mt-4 text-sm", className)),
		};
	}
	return { ...action, className: actionButtonStyle(twMerge("mt-4 text-sm", action.className)) };
}

export const EmptyStateUI = ({ title, description, icon, iconClassName, action, className }: EmptyStateProps) => (
	<div className={twMerge("max-w-sm p-6 text-center mx-auto flex flex-col items-center gap-y-2", className)}>
		{icon && (
			<IconWrapper className={iconWrapperStyles(twMerge("rounded-full text-4xl bg-gray-100 text-gray-500", iconClassName))}>{icon}</IconWrapper>
		)}
		<TitleSubtitle
			className="flex flex-col items-center text-center gap-y-1"
			titleClassName="text-base text-zinc-700"
			title={title}
			subtitle={description}
		/>
		{action && <CustomButton {...resolveAction(action)} />}
	</div>
);

type ErrorStateProps = {
	title?: string;
	description?: string;
	onRetry?: () => void;
	className?: string;
};

export const ErrorStateUI = ({
	title = "Something went wrong",
	description = "We couldn't load this right now. Please try again.",
	onRetry,
	className,
}: ErrorStateProps) => (
	<EmptyStateUI
		className={className}
		title={title}
		description={description}
		icon={<WarningTriangleIcon />}
		action={onRetry ? { children: "Try again", onClick: onRetry } : undefined}
	/>
);

export const OfflineStateUI = ({
	title = "You're offline",
	description = "Check your internet connection. We'll load this as soon as you're back online.",
	onRetry,
	className,
}: ErrorStateProps) => (
	<EmptyStateUI
		className={className}
		title={title}
		description={description}
		icon={<CellularWifiNetworkIcon />}
		action={onRetry ? { children: "Retry", onClick: onRetry } : undefined}
	/>
);
