import { Suspense } from "react";
import type { Metadata } from "next";
import { getCategories, getProducts } from "@/api/product.api";
import { EmptyProductIcon } from "@/assets/resources/icons";
import { CustomCard } from "@/components/base/custom-card";
import { PerPageSelect } from "@/components/common/per-page-select";
import { EmptyStateUI } from "@/components/common/status-state-ui";
import { TitleSubtitle } from "@/components/common/title-subtitle";
import { ProductsTable } from "@/components/page-tables/products-table";
import { ProductsToolbar } from "@/components/segments/products-toolbar";
import { PER_PAGE_OPTIONS } from "@/lib/constants";
import { buildListHref, hasActiveFilters, parseListParams, toListSearchParams } from "@/lib/list-params";
import { _router } from "@/routes/routes";
import type { ListParams } from "@/types/product.types";

export const metadata: Metadata = { title: "Products" };

type ProductsSectionProps = {
	listParams: ListParams;
	categoryNames: Record<string, string>;
};

async function ProductsSection({ listParams, categoryNames }: ProductsSectionProps) {
	const result = await getProducts(listParams);
	const currentParams = { ...listParams, page: result.page };

	return (
		<ProductsTable
			products={result.products}
			listParams={currentParams}
			categoryNames={categoryNames}
			firstSerialNumber={(result.page - 1) * result.perPage + 1}
			className="rounded-t-none border-0"
			emptyState={
				<EmptyStateUI
					className="py-14"
					title="No products match your filters"
					description={hasActiveFilters(listParams) ? "Try another search term or category." : "There are no products to show."}
					icon={<EmptyProductIcon />}
					action={
						hasActiveFilters(listParams)
							? { as: "link", href: _router.products.list.to, children: "Clear search and filters" }
							: undefined
					}
				/>
			}
			pagination={{
				page: result.page,
				pageCount: result.pageCount,
				pageSize: result.perPage,
				totalItems: result.total,
				hrefForPage: (page) => buildListHref(currentParams, { page }),
				pageSizeControl: (
					<PerPageSelect
						value={result.perPage}
						options={PER_PAGE_OPTIONS.map((perPage) => ({ value: perPage, href: buildListHref(currentParams, { perPage }) }))}
					/>
				),
			}}
		/>
	);
}

export default async function ProductsPage({ searchParams }: PageProps<"/products">) {
	const [rawParams, categories] = await Promise.all([searchParams, getCategories()]);
	const listParams = parseListParams(
		rawParams,
		categories.map((category) => category.slug),
	);
	const categoryNames = Object.fromEntries(categories.map((category) => [category.slug, category.name]));

	return (
		<div className="space-y-6">
			<TitleSubtitle
				as="h1"
				title="Products"
				subtitle="Search and filter the catalogue. Open a product to update its price and stock."
				titleClassName="text-3xl font-bold"
			/>
			<CustomCard className="rounded-xl border-gray-200/70">
				<div className="sticky top-17 z-10 flex flex-wrap items-center gap-3 rounded-t-xl border-b border-gray-100 bg-white px-4 py-3 sm:px-5">
					<TitleSubtitle title="All products" className="shrink-0" titleClassName="text-lg font-semibold whitespace-nowrap sm:text-xl" />
					<ProductsToolbar listParams={listParams} categories={categories} />
				</div>
				<Suspense
					key={toListSearchParams(listParams).toString()}
					fallback={
						<ProductsTable
							products={[]}
							listParams={listParams}
							categoryNames={categoryNames}
							isLoading
							className="rounded-t-none border-0"
						/>
					}>
					<ProductsSection listParams={listParams} categoryNames={categoryNames} />
				</Suspense>
			</CustomCard>
		</div>
	);
}
