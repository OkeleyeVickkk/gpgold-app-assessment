import type React from "react";
import { cn } from "@/lib/utils";

export type SpinnerVariant3Props = React.ComponentProps<"div">;

export function SpinnerVariant3({ className, style, ...props }: SpinnerVariant3Props) {
	return (
		<>
			<style>{`
				@keyframes spinner-variant-3-spin {
					to { transform: rotate(360deg); }
				}
			`}</style>
			<div
				className={cn("rounded-full border-[2px] border-transparent border-y-current", className)}
				style={{
					animationName: "spinner-variant-3-spin",
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
