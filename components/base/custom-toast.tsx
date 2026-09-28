"use client";

import { useEffect, useRef, useState } from "react";
import { toast as sonnerToast } from "sonner";
import { twMerge } from "cn";
import {
	CheckCircleIcon,
	ChevronDownIcon,
	CloseCircleIcon,
	CloseIcon,
	IconWrapper,
	InfoCircleIcon,
	SparklesIcon,
	WarningCircleIcon,
} from "@/assets/resources/icons";
import { CustomButton } from "@/components/base/custom-button";

export type ToastVariant = "success" | "error" | "warning" | "info" | "primary";
export type ToastButtonColor = "primary" | "success" | "error" | "warning" | "neutral";
export type ToastButtonStyle = "solid" | "outline" | "soft" | "ghost" | "transparent";

export interface ToastAction {
	label: string;
	onClick?: () => void | Promise<void>;
	color?: ToastButtonColor;
	style?: ToastButtonStyle;
	loading?: boolean;
}

interface CustomToastProps {
	id: string | number;
	variant: ToastVariant;
	title: string;
	description?: string;
	duration: number;
	icon?: React.ReactNode;
	showProgress?: boolean;
	action?: ToastAction;
	defaultExpanded?: boolean;
	showChevron?: boolean;
	showCloseButton?: boolean;
}

const VARIANT_CONFIG: Record<ToastVariant, { icon: React.ReactNode; colorClassName: string; indicatorClassName: string; bgGradient: string }> = {
	success: {
		icon: <CheckCircleIcon />,
		colorClassName: "text-emerald-500",
		indicatorClassName: "bg-emerald-500",
		bgGradient: "from-emerald-50 to-white",
	},
	error: { icon: <CloseCircleIcon />, colorClassName: "text-red-500", indicatorClassName: "bg-red-500", bgGradient: "from-red-50 to-white" },
	warning: {
		icon: <WarningCircleIcon />,
		colorClassName: "text-amber-500",
		indicatorClassName: "bg-amber-500",
		bgGradient: "from-amber-50 to-white",
	},
	info: { icon: <InfoCircleIcon />, colorClassName: "text-blue-500", indicatorClassName: "bg-blue-500", bgGradient: "from-blue-50 to-white" },
	primary: { icon: <SparklesIcon />, colorClassName: "text-primary", indicatorClassName: "bg-primary", bgGradient: "from-primary/10 to-white" },
};

const BUTTON_CLASSES: Record<ToastButtonColor, Record<ToastButtonStyle, string>> = {
	primary: {
		solid: "bg-primary text-white hover:bg-primary/90",
		outline: "bg-transparent border border-primary text-primary hover:bg-primary/10",
		soft: "bg-primary/10 text-primary hover:bg-primary/20",
		ghost: "bg-transparent text-primary hover:bg-primary/10",
		transparent: "bg-transparent text-primary hover:opacity-70",
	},
	success: {
		solid: "bg-emerald-500 text-white hover:bg-emerald-600",
		outline: "bg-transparent border border-emerald-500 text-emerald-600 hover:bg-emerald-50",
		soft: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
		ghost: "bg-transparent text-emerald-600 hover:bg-emerald-50",
		transparent: "bg-transparent text-emerald-600 hover:opacity-70",
	},
	error: {
		solid: "bg-red-500 text-white hover:bg-red-600",
		outline: "bg-transparent border border-red-500 text-red-600 hover:bg-red-50",
		soft: "bg-red-100 text-red-700 hover:bg-red-200",
		ghost: "bg-transparent text-red-600 hover:bg-red-50",
		transparent: "bg-transparent text-red-600 hover:opacity-70",
	},
	warning: {
		solid: "bg-amber-500 text-white hover:bg-amber-600",
		outline: "bg-transparent border border-amber-500 text-amber-600 hover:bg-amber-50",
		soft: "bg-amber-100 text-amber-700 hover:bg-amber-200",
		ghost: "bg-transparent text-amber-600 hover:bg-amber-50",
		transparent: "bg-transparent text-amber-600 hover:opacity-70",
	},
	neutral: {
		solid: "bg-gray-900 text-white hover:bg-gray-800",
		outline: "bg-transparent border border-gray-900 text-gray-900 hover:bg-gray-100",
		soft: "bg-gray-100 text-gray-900 hover:bg-gray-200",
		ghost: "bg-transparent text-gray-900 hover:bg-gray-100",
		transparent: "bg-transparent text-gray-900 hover:opacity-70",
	},
};

export function CustomToast({
	id,
	variant,
	title,
	description,
	showProgress = false,
	duration,
	icon,
	action,
	defaultExpanded = true,
	showChevron = false,
	showCloseButton = false,
}: CustomToastProps) {
	const [isPaused, setIsPaused] = useState(false);
	const [isActionPending, setIsActionPending] = useState(false);
	const [progress, setProgress] = useState(100);
	const [isExpanded, setIsExpanded] = useState(defaultExpanded ?? !!action);
	const remainingMsRef = useRef(duration);

	const { icon: defaultIcon, colorClassName, indicatorClassName, bgGradient } = VARIANT_CONFIG[variant];
	const hasExpandableContent = showChevron && !!(description || action);
	const isActionLoading = action?.loading ?? isActionPending;
	const shouldPauseTimer = isPaused || isActionLoading;

	useEffect(() => {
		if (shouldPauseTimer) return;

		const startTime = Date.now();
		const startingRemaining = remainingMsRef.current;

		const interval = setInterval(() => {
			const elapsed = Date.now() - startTime;
			const remainingMs = Math.max(0, startingRemaining - elapsed);
			setProgress((remainingMs / duration) * 100);

			if (remainingMs <= 0) {
				clearInterval(interval);
				sonnerToast.dismiss(id);
			}
		}, 16);

		return () => {
			clearInterval(interval);
			remainingMsRef.current = Math.max(0, startingRemaining - (Date.now() - startTime));
		};
	}, [id, duration, shouldPauseTimer]);

	const handleMouseEnter = () => setIsPaused(true);
	const handleMouseLeave = () => setIsPaused(false);

	const handleActionClick = async () => {
		const result = action?.onClick?.();
		if (result instanceof Promise) {
			setIsActionPending(true);
			try {
				await result;
			} finally {
				setIsActionPending(false);
			}
		}
	};

	return (
		<div
			className={twMerge(
				"group relative w-full max-w-full overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all duration-300 hover:shadow-lg",
				"border border-gray-100/50",
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<div
				className={twMerge("absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100", bgGradient)}
			/>

			{showProgress && (
				<div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100/50">
					<div className={twMerge("h-full transition-all duration-75 ease-linear", indicatorClassName)} style={{ width: `${progress}%` }} />
				</div>
			)}

			<div className="relative p-4">
				<div className="flex items-start gap-2">
					<div className="shrink-0">
						{icon ? (
							<IconWrapper className={twMerge("text-lg", colorClassName)}>{icon}</IconWrapper>
						) : (
							<IconWrapper className={twMerge("text-2xl", colorClassName)}>{defaultIcon}</IconWrapper>
						)}
					</div>

					<div className="flex-1 min-w-0">
						<div className="flex items-start justify-between gap-2">
							<h4 className="text-base font-semibold text-gray-900 truncate">{title}</h4>
							<div className="flex items-center gap-0.5 shrink-0">
								{hasExpandableContent && (
									<CustomButton
										onClick={() => setIsExpanded(!isExpanded)}
										leftIcon={<ChevronDownIcon />}
										leftIconClassName={twMerge(
											"text-base transition-transform duration-200 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg",
											isExpanded && "rotate-180",
										)}
										aria-label={isExpanded ? "Collapse" : "Expand"}
									/>
								)}
								{showCloseButton && (
									<CustomButton
										onClick={() => sonnerToast.dismiss(id)}
										leftIcon={<CloseIcon />}
										leftIconClassName="text-base p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
										aria-label="Close"
									/>
								)}
							</div>
						</div>

						<div className={twMerge("grid transition-[grid-template-rows]", isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
							<div className="overflow-hidden">
								{description && (
									<p
										className={twMerge(
											"mt-1 text-sm text-gray-500 leading-relaxed transition-all duration-200 font-medium",
											isExpanded ? "opacity-100 line-clamp-3" : "line-clamp-2",
										)}>
										{description}
									</p>
								)}
							</div>
						</div>

						{isExpanded && action && (
							<CustomButton
								onClick={handleActionClick}
								loading={isActionLoading}
								className={twMerge(
									"mt-3 py-2.5 px-8 active-scale rounded-full ml-auto text-sm font-medium transition-colors",
									BUTTON_CLASSES[action.color ?? "neutral"][action.style ?? "solid"],
								)}>
								{action.label}
							</CustomButton>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
