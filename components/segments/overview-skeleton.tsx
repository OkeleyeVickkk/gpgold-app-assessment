import { CustomCard } from "@/components/base/custom-card";
import { Skeleton } from "@/components/ui/skeleton";
import { METRIC_CARD_COUNT, SKELETON_ROW_COUNT } from "@/lib/constants";

export function OverviewSkeleton() {
	return (
		<div role="status" aria-label="Loading overview" className="space-y-6">
			<div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: METRIC_CARD_COUNT }, (_, index) => (
					<CustomCard key={index} className="space-y-4 rounded-xl border-gray-200/70 px-5 py-4">
						<div className="flex items-center justify-between">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="size-10 rounded-full" />
						</div>
						<Skeleton className="h-8 w-20" />
						<Skeleton className="h-4 w-36" />
					</CustomCard>
				))}
			</div>
			<div className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
				<CustomCard className="space-y-4 rounded-xl border-gray-200/70 p-5">
					<Skeleton className="h-6 w-40" />
					{Array.from({ length: SKELETON_ROW_COUNT / 2 }, (_, index) => (
						<Skeleton key={index} className="h-10 w-full" />
					))}
				</CustomCard>
				<CustomCard className="space-y-5 rounded-xl border-gray-200/70 p-5">
					<Skeleton className="h-6 w-56" />
					<Skeleton className="mx-auto size-60 rounded-full" />
				</CustomCard>
			</div>
		</div>
	);
}
