import { twMerge } from "cn";

const AVATAR_SIZES = {
	sm: "size-8 text-sm",
	md: "size-10 text-base",
	lg: "size-12 text-lg",
} as const;

const AVATAR_VARIANTS = {
	primary: "bg-primary text-primary-foreground",
	"primary-variant": "bg-primary/10 text-primary",
	gray: "bg-slate-100 text-slate-800",
} as const;

type CustomAvatarProps = {
	name: string;
	size?: keyof typeof AVATAR_SIZES;
	variant?: keyof typeof AVATAR_VARIANTS;
	letters?: 1 | 2;
	className?: string;
};

function getInitials(name: string, letters: 1 | 2) {
	const words = name.trim().split(/\s+/).filter(Boolean);
	if (words.length === 0) return "?";
	if (letters === 1 || words.length === 1) return words[0].slice(0, letters).toUpperCase();
	return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

export function CustomAvatar({ name, size = "md", variant = "primary-variant", letters = 2, className }: CustomAvatarProps) {
	return (
		<span
			aria-hidden="true"
			className={twMerge(
				"inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold select-none",
				AVATAR_SIZES[size],
				AVATAR_VARIANTS[variant],
				className,
			)}>
			{getInitials(name, letters)}
		</span>
	);
}
