"use client";

import { useEffect, useRef } from "react";
import { toast } from "@/configs/toast";
import { useOnlineStatus } from "@/hooks/common/use-online-status";
import { CellularWifiNetwork2Icon } from "@/assets/resources/icons";
import { OFFLINE_TOAST_ID, TOAST_DURATION_MS } from "@/lib/constants";

export function OfflineToast() {
	const isOnline = useOnlineStatus();
	const wasOfflineRef = useRef(false);

	useEffect(() => {
		if (!isOnline) {
			wasOfflineRef.current = true;

			toast.error({
				id: OFFLINE_TOAST_ID,
				icon: <CellularWifiNetwork2Icon />,
				title: "You're offline",
				description: "Check your internet connection. We'll reconnect automatically.",
				duration: Infinity,
				showProgress: false,
				position: "bottom-center",
			});
			return;
		}

		if (!wasOfflineRef.current) return;
		wasOfflineRef.current = false;

		toast.dismiss(OFFLINE_TOAST_ID);
		toast.success({
			title: "You're back online",
			description: "Connection restored.",
			duration: TOAST_DURATION_MS,
			position: "bottom-center",
			showProgress: true,
		});
	}, [isOnline]);

	return null;
}
