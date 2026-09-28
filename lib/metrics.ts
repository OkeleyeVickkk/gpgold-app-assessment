import { CHART_CATEGORY_LIMIT, CHART_COLORS, LOW_STOCK_THRESHOLD } from "@/lib/constants";
import { applyEdits } from "@/lib/edits-store";
import type { MetricsItem, ProductEdits } from "@/types/product.types";

export type DashboardMetrics = {
	totalProducts: number;
	lowStockCount: number;
	outOfStockCount: number;
	averageRating: number;
	inventoryValue: number;
};

export type CategoryValuePoint = {
	label: string;
	value: number;
	maxValue: number;
	color: string;
};

export function computeMetrics(items: MetricsItem[], edits: ProductEdits): DashboardMetrics {
	const products = items.map((item) => applyEdits(item, edits));
	const totalProducts = products.length;
	const ratingSum = products.reduce((sum, product) => sum + product.rating, 0);

	return {
		totalProducts,
		lowStockCount: products.filter((product) => product.stock > 0 && product.stock < LOW_STOCK_THRESHOLD).length,
		outOfStockCount: products.filter((product) => product.stock === 0).length,
		averageRating: totalProducts === 0 ? 0 : Math.round((ratingSum / totalProducts) * 100) / 100,
		inventoryValue: products.reduce((sum, product) => sum + product.price * product.stock, 0),
	};
}

export function computeInventoryValueByCategory(
	items: MetricsItem[],
	edits: ProductEdits,
	categoryNames: Record<string, string>,
): CategoryValuePoint[] {
	const valueByCategory = new Map<string, number>();
	for (const item of items) {
		const product = applyEdits(item, edits);
		valueByCategory.set(product.category, (valueByCategory.get(product.category) ?? 0) + product.price * product.stock);
	}

	const sorted = [...valueByCategory.entries()].sort((first, second) => second[1] - first[1]);
	const topCategories = sorted.slice(0, CHART_CATEGORY_LIMIT);
	const otherValue = sorted.slice(CHART_CATEGORY_LIMIT).reduce((sum, [, value]) => sum + value, 0);
	const entries = otherValue > 0 ? [...topCategories, ["other", otherValue] as const] : topCategories;
	const maxValue = entries.reduce((sum, [, value]) => sum + value, 0);

	return entries.map(([category, value], index) => ({
		label: category === "other" ? "Other categories" : (categoryNames[category] ?? category),
		value: Math.round(value),
		maxValue,
		color: CHART_COLORS[index % CHART_COLORS.length],
	}));
}
