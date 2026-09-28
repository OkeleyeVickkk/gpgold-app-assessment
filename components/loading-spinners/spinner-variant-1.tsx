import type React from "react";
import { cn } from "@/lib/utils";

export type SpinnerVariant1Props = React.ComponentProps<"div">;

export function SpinnerVariant1({ className, style, ...props }: SpinnerVariant1Props) {
	return (
		<>
			<style>{`
				@keyframes spinner-variant-1-spin {
					to { transform: rotate(360deg); }
				}
			`}</style>
			<span
				className={cn("rounded-full border-[2px] border-current/10 border-t-current", className)}
				style={{
					animationName: "spinner-variant-1-spin",
					animationDuration: "var(--duration, 1s)",
					animationTimingFunction: "linear",
					animationIterationCount: "infinite",
					...style,
				}}
				{...props}
			/>
		</>
	);
}
