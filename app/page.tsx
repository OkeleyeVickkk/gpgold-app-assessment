import { Suspense } from "react";
import { getAllProductsForMetrics, getCategories, getLowestStockProducts } from "@/api/product.api";
import { ArrowRightIcon } from "@/assets/resources/icons";
import { CustomButton } from "@/components/base/custom-button";
import { TitleSubtitle } from "@/components/common/title-subtitle";
import { InventoryByCategoryChart } from "@/components/page-charts/inventory-by-category-chart";
import { ProductsTable } from "@/components/page-tables/products-table";
import { OverviewMetrics } from "@/components/segments/overview-metrics";
import { OverviewSkeleton } from "@/components/segments/overview-skeleton";
import { buildListHref, DEFAULT_LIST_PARAMS } from "@/lib/list-params";
import type { ListParams } from "@/types/product.types";

const lowestStockListParams: ListParams = { ...DEFAULT_LIST_PARAMS, sort: "stock", order: "asc" };

async function OverviewContent() {
	const [metricsItems, categories, lowestStockProducts] = await Promise.all([
		getAllProductsForMetrics(),
		getCategories(),
		getLowestStockProducts(),
	]);
	const categoryNames = Object.fromEntries(categories.map((category) => [category.slug, category.name]));

	return (
		<>
			<OverviewMetrics items={metricsItems} />
			<div className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
				<ProductsTable
					products={lowestStockProducts}
					listParams={lowestStockListParams}
					categoryNames={categoryNames}
					compact
					caption="Products with the lowest stock"
					header={
						<div className="flex items-center justify-between gap-4 pb-4">
							<TitleSubtitle
								title="Lowest stock"
								subtitle="The products closest to running out."
								titleClassName="text-xl font-semibold"
								className="min-w-0"
							/>
							<CustomButton
								as="link"
								href={buildListHref(lowestStockListParams)}
								rightIcon={<ArrowRightIcon />}
								className="shrink-0 text-sm font-semibold text-primary hover:text-primary-dark">
								View all
							</CustomButton>
						</div>
					}
				/>
				<InventoryByCategoryChart items={metricsItems} categoryNames={categoryNames} />
			</div>
		</>
	);
}

export default function OverviewPage() {
	return (
		<div className="space-y-6">
			<TitleSubtitle
				as="h1"
				title="Overview"
				subtitle="A live snapshot of the catalogue. Metrics cover every product, not a filtered view."
				titleClassName="text-3xl font-bold"
			/>
			<Suspense fallback={<OverviewSkeleton />}>
				<OverviewContent />
			</Suspense>
		</div>
	);
}
