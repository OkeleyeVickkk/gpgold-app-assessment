import type React from "react";
import { twMerge } from "cn";
import { IconWrapper } from "@/assets/resources/icons";
import { CustomCard } from "@/components/base/custom-card";

type IconTone = "primary" | "green" | "amber" | "red" | "blue";

const TONE_STYLES: Record<IconTone, string> = {
	primary: "bg-primary/10 text-primary",
	green: "bg-green-100/80 text-green-700",
	amber: "bg-amber-100/80 text-amber-700",
	red: "bg-red-100/80 text-red-600",
	blue: "bg-blue-100/80 text-blue-600",
};

type AnalyticsStatCardProps = {
	label: string;
	value: React.ReactNode;
	caption?: string;
	icon?: React.ReactNode;
	iconTone?: IconTone;
	className?: string;
};

export const AnalyticsStatCard = ({ label, value, caption, icon, iconTone = "primary", className }: AnalyticsStatCardProps) => (
	<CustomCard className={twMerge("border-gray-200/70 py-4 px-5 flex flex-col gap-y-4", className)}>
		<div className="flex items-center justify-between gap-x-4">
			<p className="text-slate-600 text-sm font-medium">{label}</p>
			{icon && <IconWrapper className={twMerge("rounded-full p-2.5 text-[1.35rem]", TONE_STYLES[iconTone])}>{icon}</IconWrapper>}
		</div>
		<p className="font-heading text-3xl leading-none font-bold tracking-tight text-black">{value}</p>
		{caption && <p className="text-sm font-medium text-slate-500">{caption}</p>}
	</CustomCard>
);
