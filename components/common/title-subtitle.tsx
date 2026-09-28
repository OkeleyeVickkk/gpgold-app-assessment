import type React from "react";
import { twMerge } from "cn";

type TitleSubtitleProps = {
	title: string;
	subtitle?: React.ReactNode;
	as?: "h1" | "h2" | "h3";
	id?: string;
	titleExtraNode?: React.ReactNode;
	className?: string;
	titleClassName?: string;
	subtitleClassName?: string;
};

export const TitleSubtitle = ({
	title,
	subtitle,
	as: Heading = "h2",
	id,
	titleExtraNode,
	className,
	titleClassName,
	subtitleClassName,
}: TitleSubtitleProps) => (
	<div className={twMerge("text-start max-w-xl", className)}>
		<div className="flex items-center flex-wrap gap-1">
			<Heading id={id} className={twMerge("text-lg font-semibold text-slate-900", titleClassName)}>
				{title}
			</Heading>
			{titleExtraNode}
		</div>
		{typeof subtitle === "string" ? (
			<p className={twMerge("text-slate-500 leading-snug font-medium text-sm", subtitleClassName)}>{subtitle}</p>
		) : (
			subtitle
		)}
	</div>
);
