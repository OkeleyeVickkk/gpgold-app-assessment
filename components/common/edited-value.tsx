"use client";

import { CustomBadge } from "@/components/base/custom-badge";
import { useProductEdits } from "@/hooks/products/use-product-edits";
import { formatCurrency } from "@/lib/format";
import { getStockBadge } from "@/lib/product-formatting";

type EditedValueProps = {
	productId: number;
	value: number;
};

export function EditedPrice({ productId, value }: EditedValueProps) {
	const edits = useProductEdits();
	return <>{formatCurrency(edits[productId]?.price ?? value)}</>;
}

export function EditedStockBadge({ productId, value }: EditedValueProps) {
	const edits = useProductEdits();
	const badge = getStockBadge(edits[productId]?.stock ?? value);
	return <CustomBadge variant={badge.variant} size="sm" label={badge.label} />;
}
