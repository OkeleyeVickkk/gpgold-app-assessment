import { CustomCard } from "@/components/base/custom-card";
import { EntityTable } from "@/components/common/entity-table";
import { Skeleton } from "@/components/ui/skeleton";
import { SKELETON_ROW_COUNT } from "@/lib/constants";

const skeletonColumns = ["S/N", "Product", "Category", "Price", "Stock", "Rating"].map((header) => ({ key: header, header, render: () => null }));

export default function ProductsLoading() {
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<Skeleton className="h-9 w-40" />
				<Skeleton className="h-4 w-96 max-w-full" />
			</div>
			<CustomCard className="rounded-xl border-gray-200/70">
				<div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 sm:px-5">
					<Skeleton className="h-7 w-28 shrink-0" />
					<div className="flex min-w-0 flex-1 items-center justify-end gap-2">
						<Skeleton className="h-10 min-w-0 flex-1 rounded-full sm:max-w-xs" />
						<Skeleton className="h-10 w-10 shrink-0 rounded-full sm:w-28" />
					</div>
				</div>
				<EntityTable
					columns={skeletonColumns}
					data={[]}
					rowKey={() => ""}
					caption="Loading products"
					isLoading
					skeletonRows={SKELETON_ROW_COUNT}
					className="rounded-t-none border-0"
				/>
			</CustomCard>
		</div>
	);
}
