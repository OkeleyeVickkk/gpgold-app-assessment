"use client";

import { useState } from "react";
import { FilterIcon } from "@/assets/resources/icons";
import { CustomButton } from "@/components/base/custom-button";
import { CustomSelect, type SelectOption } from "@/components/base/custom-select";
import { DebouncedSearchInput } from "@/components/common/debounced-search-input";
import { FilterDrawer, FilterSection } from "@/components/drawers/filter-drawer";
import { useOnlineStatus } from "@/hooks/common/use-online-status";
import { useListNavigation } from "@/hooks/products/use-list-navigation";
import { pillButtonStyle } from "@/lib/common-styles";
import { SORT_OPTIONS } from "@/lib/constants";
import { getSortOption } from "@/lib/list-params";
import type { Category, ListParams } from "@/types/product.types";

type ProductsToolbarProps = {
	listParams: ListParams;
	categories: Category[];
};

export function ProductsToolbar({ listParams, categories }: ProductsToolbarProps) {
	const { navigate, isPending } = useListNavigation(listParams);
	const isOnline = useOnlineStatus();
	const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

	const categoryOptions: SelectOption[] = categories.map((category) => ({ value: category.slug, label: category.name }));
	const selectedCategory = categoryOptions.find((option) => option.value === listParams.category) ?? null;
	const selectedSort = getSortOption(listParams);
	const activeFilterCount = [listParams.category, listParams.sort].filter(Boolean).length;

	function handleSortChange(value: string) {
		const sortOption = SORT_OPTIONS.find((option) => option.value === value) ?? SORT_OPTIONS[0];
		navigate({ sort: sortOption.sort, order: sortOption.order });
	}

	return (
		<div className="flex min-w-3xs flex-1 items-center justify-end gap-2">
			<DebouncedSearchInput
				id="product-search"
				label="Search products"
				placeholder="Search…"
				value={listParams.query ?? ""}
				onCommit={(query) => navigate({ query: query || undefined }, { replace: true })}
				disabled={!isOnline}
				className="min-w-0 flex-1 sm:max-w-xs"
			/>
			<CustomButton
				onClick={() => setIsFilterDrawerOpen(true)}
				disabled={!isOnline}
				loading={isPending}
				leftIcon={<FilterIcon />}
				aria-label={activeFilterCount > 0 ? `Filters, ${activeFilterCount} active` : "Filters"}
				className={pillButtonStyle("relative h-10 shrink-0 px-3 sm:px-4")}>
				<span className="hidden sm:inline">Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}</span>
				{activeFilterCount > 0 && <span aria-hidden="true" className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary sm:hidden" />}
			</CustomButton>

			<FilterDrawer
				open={isFilterDrawerOpen}
				onOpenChange={setIsFilterDrawerOpen}
				title="Filter products"
				onReset={() => navigate({ category: undefined, sort: undefined, order: "asc" })}>
				<div className="space-y-5">
					<CustomSelect
						id="category-filter"
						label="Category"
						labelClassName="text-xs font-semibold text-zinc-500 uppercase sm:text-xs"
						options={categoryOptions}
						value={selectedCategory}
						onChange={(option) => navigate({ category: option?.value })}
						placeholder="All categories"
						searchPlaceholder="Search categories..."
						countLabel="category"
						disabled={!isOnline}
						triggerClassName="rounded-2xl"
					/>
					<FilterSection
						label="Sort by"
						options={SORT_OPTIONS}
						value={selectedSort.value}
						onChange={handleSortChange}
						disabled={!isOnline}
					/>
				</div>
			</FilterDrawer>
		</div>
	);
}
