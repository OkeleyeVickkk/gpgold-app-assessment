"use client";

import { ErrorStateUI, OfflineStateUI } from "@/components/common/status-state-ui";
import { useOnlineStatus } from "@/hooks/common/use-online-status";

type RouteErrorFallbackProps = {
	retry: () => void;
	description?: string;
	className?: string;
};

export function RouteErrorFallback({ retry, description, className = "py-24" }: RouteErrorFallbackProps) {
	const isOnline = useOnlineStatus();

	if (!isOnline) {
		return <OfflineStateUI className={className} description="This page needs a connection. Reconnect, then try again." onRetry={retry} />;
	}

	return <ErrorStateUI className={className} description={description} onRetry={retry} />;
}
