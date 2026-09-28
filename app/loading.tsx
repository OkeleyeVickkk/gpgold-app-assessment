import { OverviewSkeleton } from "@/components/segments/overview-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function OverviewLoading() {
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<Skeleton className="h-9 w-48" />
				<Skeleton className="h-4 w-96 max-w-full" />
			</div>
			<OverviewSkeleton />
		</div>
	);
}
