"use client";

import { EditProductIcon } from "@/assets/resources/icons";
import { CustomModal } from "@/components/base/custom-modal-dialog";
import { EDIT_PRODUCT_FORM_ID, EditProductForm } from "@/components/forms/edit-product-form";
import { useOnlineStatus } from "@/hooks/common/use-online-status";
import type { ProductEditFieldErrors, ProductEditInput } from "@/types/product.types";

type EditProductModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	productTitle: string;
	currentValues: Required<ProductEditInput>;
	isSaving: boolean;
	serverError?: string;
	serverFieldErrors?: ProductEditFieldErrors;
	onSave: (values: Required<ProductEditInput>) => void;
};

export function EditProductModal({
	open,
	onOpenChange,
	productTitle,
	currentValues,
	isSaving,
	serverError,
	serverFieldErrors,
	onSave,
}: EditProductModalProps) {
	const isOnline = useOnlineStatus();

	return (
		<CustomModal
			open={open}
			onOpenChange={(nextOpen) => {
				if (!isSaving) onOpenChange(nextOpen);
			}}
			title="Edit price and stock"
			description={productTitle}
			icon={<EditProductIcon />}
			cancelLabel="Cancel"
			actionLabel={isSaving ? "Saving…" : "Save changes"}
			closeOnAction={false}
			cancelButtonProps={{ disabled: isSaving }}
			actionButtonProps={{ type: "submit", form: EDIT_PRODUCT_FORM_ID, loading: isSaving, disabled: !isOnline }}
			className="sm:max-w-lg">
			<EditProductForm
				initialValues={currentValues}
				serverError={serverError}
				serverFieldErrors={serverFieldErrors}
				disabled={isSaving}
				onSubmit={onSave}
			/>
		</CustomModal>
	);
}
