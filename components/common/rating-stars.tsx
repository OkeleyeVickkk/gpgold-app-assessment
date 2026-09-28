import { twMerge } from "cn";
import { IconWrapper, StarFilledIcon } from "@/assets/resources/icons";

export function RatingStars({ rating, className }: { rating: number; className?: string }) {
	const rounded = Math.round(rating);

	return (
		<span role="img" aria-label={`Rated ${rating.toFixed(1)} out of 5`} className={twMerge("inline-flex gap-0.5 text-sm", className)}>
			{Array.from({ length: 5 }, (_, index) => (
				<IconWrapper key={index} className={twMerge("text-[1em]", index < rounded ? "text-amber-500" : "text-gray-300")}>
					<StarFilledIcon />
				</IconWrapper>
			))}
		</span>
	);
}
