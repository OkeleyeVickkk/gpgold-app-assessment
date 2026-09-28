import { EmptyProductIcon } from "@/assets/resources/icons";
import { CustomCard } from "@/components/base/custom-card";
import { EmptyStateUI } from "@/components/common/status-state-ui";
import { _router } from "@/routes/routes";

export default function ProductNotFound() {
	return (
		<CustomCard>
			<EmptyStateUI
				className="py-16"
				title="Product not found"
				description="This product doesn't exist or may have been removed."
				icon={<EmptyProductIcon />}
				action={{ as: "link", href: _router.products.list.to, children: "Back to products" }}
			/>
		</CustomCard>
	);
}
