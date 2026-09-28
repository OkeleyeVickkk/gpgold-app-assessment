"use client";

import { useSyncExternalStore } from "react";
import { getEditsSnapshot, getServerEditsSnapshot, subscribeToEdits } from "@/lib/edits-store";

export function useProductEdits() {
	return useSyncExternalStore(subscribeToEdits, getEditsSnapshot, getServerEditsSnapshot);
}
