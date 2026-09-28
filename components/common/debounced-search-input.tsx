"use client";

import { useEffect, useState } from "react";
import { SearchIcon } from "@/assets/resources/icons";
import { CustomInput } from "@/components/base/custom-input";
import { useDebouncedValue } from "@/hooks/common/use-debounced-value";
import { SEARCH_DEBOUNCE_MS } from "@/lib/constants";

type DebouncedSearchInputProps = {
	id: string;
	label: string;
	value: string;
	onCommit: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
};

export function DebouncedSearchInput({ id, label, value, onCommit, placeholder, disabled, className }: DebouncedSearchInputProps) {
	const [input, setInput] = useState(value);
	const [syncedValue, setSyncedValue] = useState(value);
	const debouncedInput = useDebouncedValue(input, SEARCH_DEBOUNCE_MS);

	if (value !== syncedValue) {
		setSyncedValue(value);
		setInput(value);
	}

	useEffect(() => {
		const nextValue = debouncedInput.trim();
		if (debouncedInput !== input || nextValue === value) return;
		onCommit(nextValue);
	}, [debouncedInput, input, value, onCommit]);

	function handleClear() {
		setInput("");
		if (value) onCommit("");
	}

	return (
		<form role="search" onSubmit={(event) => event.preventDefault()} className={className}>
			<CustomInput
				id={id}
				type="search"
				label={label}
				hideLabel
				placeholder={placeholder}
				value={input}
				onChange={(event) => setInput(event.target.value)}
				onClear={handleClear}
				clearLabel="Clear search"
				disabled={disabled}
				leftIcon={<SearchIcon />}
				inputClassName="h-10 rounded-full bg-white py-0 text-sm sm:text-sm"
			/>
		</form>
	);
}
