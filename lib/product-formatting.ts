import type { BadgeVariant } from "@/types/common.types";
import { LOW_STOCK_THRESHOLD } from "@/lib/constants";
import { formatNumber } from "@/lib/format";

export function getStockBadge(stock: number): { variant: BadgeVariant; label: string } {
	if (stock === 0) return { variant: "danger", label: "Out of stock" };
	if (stock < LOW_STOCK_THRESHOLD) return { variant: "warning", label: `Low · ${formatNumber(stock)} left` };
	return { variant: "success", label: `${formatNumber(stock)} in stock` };
}
