"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CustomSelect, type SelectOption } from "@/components/base/custom-select";
import { useOnlineStatus } from "@/hooks/common/use-online-status";

type PerPageSelectProps = {
	value: number;
	options: { value: number; href: string }[];
};

export function PerPageSelect({ value, options }: PerPageSelectProps) {
	const router = useRouter();
	const isOnline = useOnlineStatus();
	const [isPending, startTransition] = useTransition();
	const selectOptions: SelectOption[] = options.map((option) => ({ value: String(option.value), label: String(option.value) }));

	function handleChange(option: SelectOption | null) {
		const nextOption = options.find((candidate) => String(candidate.value) === option?.value);
		if (!nextOption) return;
		startTransition(() => router.push(nextOption.href, { scroll: false }));
	}

	return (
		<CustomSelect
			id="per-page-select"
			label="Rows per page"
			className="w-auto flex-row items-center gap-2"
			labelClassName="mb-0 text-sm font-normal text-gray-500 sm:text-sm"
			options={selectOptions}
			value={{ value: String(value), label: String(value) }}
			onChange={handleChange}
			clearable={false}
			searchable={false}
			showCount={false}
			disabled={!isOnline || isPending}
			triggerClassName="h-9 w-24 bg-white py-1.5 text-sm"
		/>
	);
}
