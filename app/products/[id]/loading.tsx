import { CustomCard } from "@/components/base/custom-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
	return (
		<div role="status" aria-label="Loading product" className="space-y-6">
			<Skeleton className="h-5 w-36" />
			<div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
				<CustomCard className="p-4">
					<Skeleton className="aspect-square w-full rounded-lg" />
				</CustomCard>
				<div className="space-y-6">
					<div className="space-y-3">
						<Skeleton className="h-4 w-40" />
						<Skeleton className="h-8 w-3/4" />
						<Skeleton className="h-4 w-32" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-2/3" />
					</div>
					<CustomCard className="space-y-4 p-5">
						<div className="grid grid-cols-2 gap-4">
							<Skeleton className="h-12" />
							<Skeleton className="h-12" />
						</div>
						<div className="grid gap-4 sm:grid-cols-2">
							<Skeleton className="h-11" />
							<Skeleton className="h-11" />
						</div>
						<Skeleton className="h-11 w-36 rounded-full" />
					</CustomCard>
				</div>
			</div>
		</div>
	);
}
