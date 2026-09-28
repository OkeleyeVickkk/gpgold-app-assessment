"use client";

import type React from "react";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "cn";
import { IconWrapper } from "@/assets/resources/icons";
import { SPINNER_VARIANTS, type SpinnerVariantKey } from "@/components/loading-spinners";

type BaseProps = {
	children?: React.ReactNode;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	leftIconClassName?: string;
	rightIconClassName?: string;
	disabled?: boolean;
	loading?: boolean;
	spinnerVariant?: SpinnerVariantKey;
	spinnerClassName?: string;
};

type NextLinkProps = Omit<React.ComponentProps<typeof Link>, "as" | "className">;

export type NavLinkRenderProps = { isActive: boolean };

type ButtonProps = BaseProps &
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		as?: "button";
	};

type LinkProps = BaseProps &
	NextLinkProps & {
		as: "link";
		className?: string;
	};

type NavLinkProps = BaseProps &
	NextLinkProps & {
		as: "navlink";
		className?: string | ((props: NavLinkRenderProps) => string | undefined);
		end?: boolean;
	};

type SpanProps = BaseProps &
	React.HTMLAttributes<HTMLSpanElement> & {
		as: "span";
	};

export type CustomButtonProps = ButtonProps | LinkProps | NavLinkProps | SpanProps;

const baseClasses = "flex justify-center items-center gap-x-2";
const disabledInteractionClasses = "opacity-90 cursor-not-allowed pointer-events-none";

const subscribeNoop = () => () => {};

const BASE_PROP_KEYS = [
	"as",
	"children",
	"leftIcon",
	"rightIcon",
	"leftIconClassName",
	"rightIconClassName",
	"disabled",
	"loading",
	"spinnerVariant",
	"spinnerClassName",
] as const;

function omitBaseProps<T extends BaseProps & { as?: string }>(props: T): Omit<T, (typeof BASE_PROP_KEYS)[number]> {
	const rest: Record<string, unknown> = { ...props };
	for (const key of BASE_PROP_KEYS) delete rest[key];
	return rest as Omit<T, (typeof BASE_PROP_KEYS)[number]>;
}

function ButtonContent({
	children,
	leftIcon,
	rightIcon,
	leftIconClassName,
	rightIconClassName,
	loading,
	spinnerVariant,
	spinnerClassName,
}: BaseProps) {
	const Spinner = SPINNER_VARIANTS[spinnerVariant ?? 1];

	return (
		<>
			{loading ? (
				<Spinner className={twMerge("h-4 w-4 shrink-0", spinnerClassName)} />
			) : (
				leftIcon && <IconWrapper className={twMerge(leftIconClassName)}>{leftIcon}</IconWrapper>
			)}
			{children && (typeof children === "string" ? <span>{children}</span> : children)}
			{!loading && rightIcon && <IconWrapper className={twMerge(rightIconClassName)}>{rightIcon}</IconWrapper>}
		</>
	);
}

function hrefPathname(href: NextLinkProps["href"]) {
	const path = typeof href === "string" ? href.split(/[?#]/)[0] : (href.pathname ?? "");
	return path.length > 1 ? path.replace(/\/$/, "") : path;
}

function NavLinkButton({
	contentProps,
	isDisabled,
	isLoading,
	props,
}: {
	contentProps: BaseProps;
	isDisabled: boolean;
	isLoading: boolean;
	props: NavLinkProps;
}) {
	const { end, className, onClick, ...rest } = omitBaseProps(props);

	const pathname = usePathname();
	const isHydrated = useSyncExternalStore(
		subscribeNoop,
		() => true,
		() => false,
	);
	const target = hrefPathname(rest.href);
	const isActive = isHydrated && (end || target === "/" ? pathname === target : pathname === target || pathname.startsWith(`${target}/`));

	return (
		<Link
			className={twMerge(
				baseClasses,
				typeof className === "function" ? className({ isActive }) : className,
				isDisabled && disabledInteractionClasses,
			)}
			aria-current={isActive ? "page" : undefined}
			aria-disabled={isDisabled || undefined}
			aria-busy={isLoading || undefined}
			tabIndex={isDisabled ? -1 : undefined}
			onClick={(event) => {
				if (isDisabled) {
					event.preventDefault();
					return;
				}
				onClick?.(event);
			}}
			{...rest}>
			<ButtonContent {...contentProps} />
		</Link>
	);
}

export const CustomButton = (props: CustomButtonProps) => {
	const { children, leftIcon, rightIcon, leftIconClassName, rightIconClassName, loading, spinnerVariant, spinnerClassName } = props;

	const isLoading = !!loading;
	const isDisabled = !!(props.disabled || isLoading);
	const contentProps: BaseProps = {
		children,
		leftIcon,
		rightIcon,
		leftIconClassName,
		rightIconClassName,
		loading: isLoading,
		spinnerVariant,
		spinnerClassName,
	};

	if (props.as === "navlink") {
		return <NavLinkButton contentProps={contentProps} isDisabled={isDisabled} isLoading={isLoading} props={props} />;
	}

	if (props.as === "link") {
		const { className, onClick, ...rest } = omitBaseProps(props);
		return (
			<Link
				className={twMerge(baseClasses, isDisabled && disabledInteractionClasses, className)}
				aria-disabled={isDisabled || undefined}
				aria-busy={isLoading || undefined}
				tabIndex={isDisabled ? -1 : undefined}
				onClick={(event) => {
					if (isDisabled) {
						event.preventDefault();
						return;
					}
					onClick?.(event);
				}}
				{...rest}>
				<ButtonContent {...contentProps} />
			</Link>
		);
	}

	if (props.as === "span") {
		const { className, onClick, ...rest } = omitBaseProps(props);
		return (
			<span
				className={twMerge(baseClasses, isDisabled && disabledInteractionClasses, className)}
				aria-disabled={isDisabled || undefined}
				aria-busy={isLoading || undefined}
				onClick={(event) => {
					if (isDisabled) return;
					onClick?.(event);
				}}
				{...rest}>
				<ButtonContent {...contentProps} />
			</span>
		);
	}

	const { className, ...rest } = omitBaseProps(props);
	return (
		<button
			type="button"
			disabled={isDisabled}
			aria-busy={isLoading || undefined}
			className={twMerge(
				baseClasses,
				"disabled:opacity-90 disabled:cursor-not-allowed disabled:scale-100 disabled:select-none disabled:border-gray-200 disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:text-gray-700",
				className,
			)}
			{...rest}>
			<ButtonContent {...contentProps} />
		</button>
	);
};
