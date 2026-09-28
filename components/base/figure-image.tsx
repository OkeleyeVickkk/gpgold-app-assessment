"use client";

import type React from "react";
import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { twMerge } from "cn";

type FigureImageProps = Omit<ImageProps, "fill" | "width" | "height"> & {
	sizes: string;
	imgClassName?: string;
	fallback?: React.ReactNode;
};

export const FigureImage = ({ src, alt, sizes, className, imgClassName, fallback = null, onError, ...rest }: FigureImageProps) => {
	const [failedSrc, setFailedSrc] = useState<ImageProps["src"] | null>(null);

	return (
		<figure className={twMerge("relative overflow-hidden", className)}>
			{failedSrc === src ? (
				fallback
			) : (
				<Image
					src={src}
					alt={alt}
					sizes={sizes}
					fill
					className={twMerge("object-cover object-center", imgClassName)}
					onError={(event) => {
						setFailedSrc(src);
						onError?.(event);
					}}
					{...rest}
				/>
			)}
		</figure>
	);
};
