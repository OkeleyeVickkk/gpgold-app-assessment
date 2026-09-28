"use client";

import { useOptimistic, useState, useTransition } from "react";
import { updateProductAction } from "@/app/products/[id]/actions";
import { EditProductIcon } from "@/assets/resources/icons";
import { CustomBadge } from "@/components/base/custom-badge";
import { CustomButton } from "@/components/base/custom-button";
import { CustomCard } from "@/components/base/custom-card";
import { EditProductModal } from "@/components/dialogs/product-alert-dialogs";
import { toast } from "@/configs/toast";
import { useOnlineStatus } from "@/hooks/common/use-online-status";
import { useProductEdits } from "@/hooks/products/use-product-edits";
import { actionButtonStyle } from "@/lib/common-styles";
import { applyEdits, saveProductEdit } from "@/lib/edits-store";
import { formatCurrency, formatNumber } from "@/lib/format";
import { getStockBadge } from "@/lib/product-formatting";
import type { Product, ProductEditFieldErrors, ProductEditInput, UpdateProductResult } from "@/types/product.types";

type PricingValues = Pick<Product, "id" | "title" | "price" | "stock">;
type SaveError = { message: string; fieldErrors?: ProductEditFieldErrors } | null;

function getChangedFields(next: Required<ProductEditInput>, current: Required<ProductEditInput>): ProductEditInput {
	return {
		...(next.price !== current.price ? { price: next.price } : {}),
		...(next.stock !== current.stock ? { stock: next.stock } : {}),
	};
}

export function ProductPricingCard({ product }: { product: PricingValues }) {
	const edits = useProductEdits();
	const isOnline = useOnlineStatus();
	const current = applyEdits(product, edits);
	const [optimisticValues, applyOptimisticChanges] = useOptimistic(current, (state: PricingValues, changes: ProductEditInput) => ({
		...state,
		...changes,
	}));
	const [isSaving, startTransition] = useTransition();
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [saveError, setSaveError] = useState<SaveError>(null);
	const stockBadge = getStockBadge(optimisticValues.stock);

	function openEditor() {
		setSaveError(null);
		setIsEditOpen(true);
	}

	function handleSave(values: Required<ProductEditInput>) {
		const changes = getChangedFields(values, current);
		if (Object.keys(changes).length === 0) {
			setIsEditOpen(false);
			toast.info({ title: "Nothing to save", description: "The price and stock are unchanged." });
			return;
		}

		setSaveError(null);
		startTransition(async () => {
			applyOptimisticChanges(changes);
			const result = await updateProductAction(product.id, changes).catch((): UpdateProductResult => ({
				ok: false,
				message: "Couldn't reach the server. Check your connection. Nothing was saved.",
			}));

			if (result.ok) {
				saveProductEdit(product.id, changes);
				setIsEditOpen(false);
				toast.success({ title: "Changes saved", description: `${product.title} has been updated.`, showProgress: true });
				return;
			}

			setSaveError({ message: result.message, fieldErrors: result.fieldErrors });
		});
	}

	return (
		<CustomCard className="space-y-5 rounded-xl border-gray-200/70 p-5">
			<dl className="grid grid-cols-2 gap-4" aria-busy={isSaving}>
				<div className="space-y-1">
					<dt className="text-sm text-slate-500">Price</dt>
					<dd className="font-heading text-3xl font-bold text-slate-900">{formatCurrency(optimisticValues.price)}</dd>
				</div>
				<div className="space-y-1">
					<dt className="text-sm text-slate-500">Stock</dt>
					<dd className="flex flex-wrap items-center gap-2">
						<span className="font-heading text-3xl font-bold text-slate-900">{formatNumber(optimisticValues.stock)}</span>
						<CustomBadge variant={stockBadge.variant} size="sm" label={stockBadge.label} />
					</dd>
				</div>
			</dl>
			<CustomButton
				onClick={openEditor}
				disabled={!isOnline}
				loading={isSaving}
				leftIcon={<EditProductIcon />}
				className={actionButtonStyle("w-full text-sm sm:w-auto")}>
				{isSaving ? "Saving…" : "Edit price & stock"}
			</CustomButton>
			<EditProductModal
				open={isEditOpen}
				onOpenChange={setIsEditOpen}
				productTitle={product.title}
				currentValues={{ price: current.price, stock: current.stock }}
				isSaving={isSaving}
				serverError={saveError?.message}
				serverFieldErrors={saveError?.fieldErrors}
				onSave={handleSave}
			/>
		</CustomCard>
	);
}
