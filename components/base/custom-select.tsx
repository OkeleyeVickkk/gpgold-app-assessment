"use client";

import * as React from "react";
import { twMerge } from "cn";
import { CheckIcon, ChevronDownIcon, EmptyListIcon, IconWrapper, PlusIcon, SearchIcon } from "@/assets/resources/icons";
import { CustomButton } from "@/components/base/custom-button";
import { CustomInput } from "@/components/base/custom-input";
import { CustomLabel } from "@/components/base/custom-label";
import { FieldMessage } from "@/components/base/field-message";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { inputStyle } from "@/lib/common-styles";

export interface SelectOption<T = unknown> {
	label: string;
	value: string;
	subtitle?: string;
	icon?: React.ReactNode;
	data?: T;
}

interface CustomSelectProps<T = unknown> {
	label?: string;
	labelClassName?: string;
	id: string;
	options: SelectOption<T>[];
	value?: SelectOption<T> | null;
	onChange?: (option: SelectOption<T> | null) => void;
	placeholder?: string;
	searchPlaceholder?: string;
	emptyMessage?: string;
	required?: boolean;
	disabled?: boolean;
	clearable?: boolean;
	searchable?: boolean;
	showCount?: boolean;
	countLabel?: string;
	leftIcon?: React.ReactNode;
	filterFn?: (option: SelectOption<T>, query: string) => boolean;
	className?: string;
	triggerClassName?: string;
	contentClassName?: string;
	error?: string;
	hint?: string;
	allowCustomValue?: boolean;
	customValueLabel?: (query: string) => string;
}

export function CustomSelect<T = unknown>({
	label,
	labelClassName,
	id,
	options,
	value,
	onChange,
	placeholder = "Select an option",
	searchPlaceholder = "Search...",
	emptyMessage,
	required = false,
	disabled = false,
	clearable = true,
	searchable = true,
	showCount = true,
	countLabel = "option",
	leftIcon,
	filterFn,
	className = "",
	triggerClassName = "",
	contentClassName = "",
	error,
	hint,
	allowCustomValue = false,
	customValueLabel,
}: CustomSelectProps<T>) {
	const [open, setOpen] = React.useState(false);
	const [query, setQuery] = React.useState("");

	const filtered = React.useMemo(() => {
		if (query.trim() === "") return options;
		const defaultFilter = (option: SelectOption<T>) =>
			option.label.toLowerCase().includes(query.toLowerCase()) ||
			option.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
			option.value.toLowerCase().includes(query.toLowerCase());
		return options.filter(filterFn ? (option) => filterFn(option, query) : defaultFilter);
	}, [query, options, filterFn]);

	const handleSelect = (option: SelectOption<T>) => {
		if (clearable && value?.value === option.value) {
			onChange?.(null);
		} else {
			onChange?.(option);
		}
		setOpen(false);
		setQuery("");
	};

	const trimmedQuery = query.trim();
	const hasExactMatch = options.some((option) => option.label.toLowerCase() === trimmedQuery.toLowerCase());
	const showCreateOption = allowCustomValue && trimmedQuery !== "" && !hasExactMatch;

	const handleCreateCustom = () => {
		onChange?.({ label: trimmedQuery, value: trimmedQuery });
		setOpen(false);
		setQuery("");
	};

	const resolvedEmptyMessage = emptyMessage ?? `No ${countLabel} found${query ? ` for "${query}"` : ""}`;

	return (
		<div className={twMerge("flex flex-col items-start w-full", className)}>
			{label && (
				<CustomLabel htmlFor={id} className={twMerge("text-black text-sm sm:text-base", labelClassName)} required={required}>
					{label}
				</CustomLabel>
			)}

			<DropdownMenu open={open} onOpenChange={disabled ? undefined : setOpen}>
				<DropdownMenuTrigger asChild>
					<CustomButton
						id={id}
						type="button"
						role="combobox"
						aria-expanded={open}
						aria-haspopup="listbox"
						aria-required={required}
						disabled={disabled}
						rightIcon={<ChevronDownIcon />}
						rightIconClassName={twMerge("shrink-0 ml-2 transition-transform duration-200 text-slate-400", open && "rotate-180")}
						className={twMerge(
							inputStyle("read-only:bg-white py-3 hover:bg-gray-50/50"),
							"flex items-center justify-between w-full text-left cursor-pointer",
							"disabled:opacity-50 disabled:cursor-not-allowed",
							error && "border-red-500 focus:ring-red-300",
							triggerClassName,
						)}>
						<span className="flex items-center gap-x-2 truncate">
							{(value?.icon ?? leftIcon) && <IconWrapper className="shrink-0 text-slate-400">{value?.icon ?? leftIcon}</IconWrapper>}
							<span
								className={twMerge(
									"leading-tight text-sm max-w-60 sm:max-w-sm text-ellipsis line-clamp-1",
									value ? "text-black" : "text-slate-400",
								)}>
								{value ? value.label : placeholder}
							</span>
						</span>
					</CustomButton>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					align="center"
					sideOffset={6}
					className={twMerge(
						"p-0 w-(--radix-dropdown-menu-trigger-width) ring-1 shadow-md ring-slate-100 no-scrollbar rounded-lg",
						contentClassName,
					)}
					onCloseAutoFocus={(event) => event.preventDefault()}>
					{searchable && (
						<div className="p-2 border-b border-slate-100">
							<CustomInput
								id={`${id}-search`}
								placeholder={searchPlaceholder}
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								onClear={() => setQuery("")}
								clearLabel="Clear search"
								leftIcon={<SearchIcon />}
								inputClassName="py-1.5 placeholder:text-sm"
								onKeyDown={(event) => event.stopPropagation()}
							/>
						</div>
					)}

					<div className="max-h-60 overflow-y-auto py-1 px-1 no-scrollbar">
						{filtered.length === 0 && !showCreateOption && (
							<div className="py-6 flex flex-col items-center justify-center gap-1">
								<IconWrapper className="text-slate-500 text-2xl">
									<EmptyListIcon />
								</IconWrapper>
								<p className="text-center font-medium text-sm text-slate-500">{resolvedEmptyMessage}</p>
							</div>
						)}

						{showCreateOption && (
							<DropdownMenuItem
								onSelect={handleCreateCustom}
								className="flex items-center gap-x-2 font-medium hover:bg-gray-50 px-3 py-1.5 text-sm cursor-pointer rounded-sm text-primary">
								<IconWrapper className="shrink-0">
									<PlusIcon />
								</IconWrapper>
								<span className="truncate">{customValueLabel ? customValueLabel(trimmedQuery) : `Add "${trimmedQuery}"`}</span>
							</DropdownMenuItem>
						)}

						{filtered.length > 0 &&
							filtered.map((option) => {
								const isSelected = value?.value === option.value;
								return (
									<DropdownMenuItem
										key={option.value}
										onSelect={() => handleSelect(option)}
										className={twMerge(
											"flex items-center justify-between font-medium hover:bg-gray-50 px-3 py-1.5 text-sm cursor-pointer rounded-sm",
											isSelected && "bg-primary/5 text-primary font-medium",
										)}>
										<span className="flex items-center gap-x-2">
											{option.icon && (
												<IconWrapper className={twMerge("shrink-0", isSelected ? "text-primary" : "text-slate-400")}>
													{option.icon}
												</IconWrapper>
											)}
											<span className="flex flex-col">
												<span className="max-w-xs line-clamp-1">{option.label}</span>
												{option.subtitle && <span className="text-xs text-slate-400 font-normal">{option.subtitle}</span>}
											</span>
										</span>

										{isSelected && (
											<IconWrapper className="text-primary shrink-0">
												<CheckIcon />
											</IconWrapper>
										)}
									</DropdownMenuItem>
								);
							})}
					</div>

					{showCount && (
						<div className="px-3 py-2 border-t border-slate-100 bg-slate-50">
							<p className="text-xs text-slate-400">
								{filtered.length} {countLabel}
								{filtered.length !== 1 ? "s" : ""} available
							</p>
						</div>
					)}
				</DropdownMenuContent>
			</DropdownMenu>

			<FieldMessage id={`${id}-message`} error={error} hint={hint} />
		</div>
	);
}
