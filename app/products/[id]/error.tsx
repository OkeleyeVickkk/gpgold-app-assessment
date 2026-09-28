"use client";

import { RouteErrorFallback } from "@/components/common/route-error-fallback";

export default function ProductDetailError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
	return <RouteErrorFallback retry={retry} description="We couldn't load this product. Trying again usually fixes it." />;
}
