"use client";

import { AnalyticsIcon, EmptyProductIcon, ProductIcon, RestockProductIcon } from "@/assets/resources/icons";
import { AnalyticsStatCard } from "@/components/common/analytics-stat-card";
import { useProductEdits } from "@/hooks/products/use-product-edits";
import { LOW_STOCK_THRESHOLD } from "@/lib/constants";
import { formatNumber, formatRating } from "@/lib/format";
import { computeMetrics } from "@/lib/metrics";
import type { MetricsItem } from "@/types/product.types";

export function OverviewMetrics({ items }: { items: MetricsItem[] }) {
	const edits = useProductEdits();
	const metrics = computeMetrics(items, edits);

	return (
		<section aria-label="Catalogue metrics" className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
			<AnalyticsStatCard
				label="Total products"
				value={formatNumber(metrics.totalProducts)}
				icon={<ProductIcon />}
				caption="Across all categories"
			/>
			<AnalyticsStatCard
				label="Low stock"
				value={formatNumber(metrics.lowStockCount)}
				icon={<RestockProductIcon />}
				iconTone="amber"
				caption={`Fewer than ${LOW_STOCK_THRESHOLD} units left`}
			/>
			<AnalyticsStatCard
				label="Out of stock"
				value={formatNumber(metrics.outOfStockCount)}
				icon={<EmptyProductIcon />}
				iconTone="red"
				caption="Need restocking now"
			/>
			<AnalyticsStatCard
				label="Average rating"
				value={formatRating(metrics.averageRating)}
				icon={<AnalyticsIcon />}
				iconTone="green"
				caption="Out of 5 across the catalogue"
			/>
		</section>
	);
}
