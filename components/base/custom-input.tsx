"use client";

import type React from "react";
import { twMerge } from "cn";
import { CloseIcon, IconWrapper } from "@/assets/resources/icons";
import { CustomButton } from "@/components/base/custom-button";
import { CustomLabel } from "@/components/base/custom-label";
import { FieldMessage } from "@/components/base/field-message";
import { inputStyle } from "@/lib/common-styles";

type CustomInputProps = React.ComponentProps<"input"> & {
	id: string;
	label?: string;
	hideLabel?: boolean;
	labelClassName?: string;
	inputClassName?: string;
	error?: string;
	hint?: React.ReactNode;
	leftIcon?: React.ReactNode;
	leftIconClassName?: string;
	onClear?: () => void;
	clearLabel?: string;
};

export const CustomInput = ({
	id,
	label,
	hideLabel = false,
	labelClassName,
	className,
	inputClassName,
	error,
	hint,
	leftIcon,
	leftIconClassName,
	onClear,
	clearLabel = "Clear",
	required,
	onKeyDown,
	...props
}: CustomInputProps) => {
	const showClear = !!onClear && !!props.value && !props.disabled && !props.readOnly;
	const messageId = `${id}-message`;
	const describedBy = [props["aria-describedby"], error || hint ? messageId : undefined].filter(Boolean).join(" ") || undefined;

	return (
		<div className={twMerge("flex flex-col items-start", className)}>
			{label && (
				<CustomLabel htmlFor={id} required={required} className={twMerge(hideLabel && "sr-only", labelClassName)}>
					{label}
				</CustomLabel>
			)}
			<div className="relative flex items-center w-full">
				{leftIcon && (
					<IconWrapper
						className={twMerge("absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none", leftIconClassName)}>
						{leftIcon}
					</IconWrapper>
				)}

				<input
					id={id}
					required={required}
					onKeyDown={(event) => {
						if (event.key === "Escape" && showClear) onClear();
						onKeyDown?.(event);
					}}
					{...props}
					aria-invalid={error ? true : undefined}
					aria-describedby={describedBy}
					className={twMerge(
						inputStyle(inputClassName),
						error && "border-red-500 focus:ring-red-300",
						leftIcon && "pl-10",
						showClear && "pr-9",
						onClear && "[&::-webkit-search-cancel-button]:appearance-none",
					)}
				/>

				{showClear && (
					<CustomButton
						aria-label={clearLabel}
						title={clearLabel}
						onMouseDown={(event) => event.preventDefault()}
						onClick={onClear}
						className="absolute right-2 top-1/2 -translate-y-1/2 size-6 rounded-full text-sm text-slate-400 hover:bg-slate-100 hover:text-slate-600">
						<IconWrapper>
							<CloseIcon />
						</IconWrapper>
					</CustomButton>
				)}
			</div>

			<FieldMessage id={messageId} error={error} hint={hint} />
		</div>
	);
};
