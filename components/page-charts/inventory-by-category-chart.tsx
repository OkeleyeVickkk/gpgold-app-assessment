"use client";

import { Legend, LegendItem, LegendLabel, LegendMarker, LegendProgress, LegendValue } from "@/components/charts/legend";
import { PieCenter } from "@/components/charts/pie-center";
import { PieChart } from "@/components/charts/pie-chart";
import { PieSlice } from "@/components/charts/pie-slice";
import { CustomCard } from "@/components/base/custom-card";
import { TitleSubtitle } from "@/components/common/title-subtitle";
import { useProductEdits } from "@/hooks/products/use-product-edits";
import { formatWholeCurrency } from "@/lib/format";
import { computeInventoryValueByCategory } from "@/lib/metrics";
import type { MetricsItem } from "@/types/product.types";

type InventoryByCategoryChartProps = {
	items: MetricsItem[];
	categoryNames: Record<string, string>;
};

export function InventoryByCategoryChart({ items, categoryNames }: InventoryByCategoryChartProps) {
	const edits = useProductEdits();
	const data = computeInventoryValueByCategory(items, edits, categoryNames);

	return (
		<CustomCard className="space-y-5 rounded-xl border-gray-200/70 p-5">
			<TitleSubtitle
				id="inventory-chart-heading"
				title="Inventory value by category"
				subtitle="Price and stock, including your saved edits."
				titleClassName="text-xl font-semibold"
			/>
			<figure aria-labelledby="inventory-chart-heading" className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 2xl:grid-cols-1">
				<PieChart data={data} innerRadius={78} size={240} className="mx-auto">
					{data.map((point, index) => (
						<PieSlice index={index} key={point.label} />
					))}
					<PieCenter
						defaultLabel="Total value"
						prefix="$"
						formatOptions={{ notation: "compact", maximumFractionDigits: 1 }}
						valueClassName="font-heading text-3xl font-semibold"
						labelClassName="font-medium text-gray-600"
					/>
				</PieChart>
				<figcaption>
					<Legend items={data} className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
						<div>
							<LegendItem className="flex w-full items-center gap-1.5 px-0">
								<LegendMarker className="size-2" />
								<LegendLabel className="text-sm font-medium" />
								<LegendValue className="ml-auto text-sm font-semibold text-slate-900" formatValue={formatWholeCurrency} />
							</LegendItem>
							<LegendProgress trackClassName="bg-zinc-100" />
						</div>
					</Legend>
				</figcaption>
			</figure>
		</CustomCard>
	);
}
