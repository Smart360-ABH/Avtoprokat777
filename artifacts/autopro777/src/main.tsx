import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl } from "@workspace/api-client-react";

function showErrorOverlay(message: string) {
	try {
		const root = document.getElementById("root");
		if (!root) return;
		root.innerHTML = `<div style="padding:20px;background:#fff;color:#900;font-family:monospace;
			line-height:1.4;border:3px solid #900;white-space:pre-wrap;">${message}</div>`;
	} catch (e) {
		// ignore
	}
}

window.addEventListener("error", (e) => {
	console.error("Uncaught error:", e.error || e.message);
	showErrorOverlay(`Uncaught error:\n${String(e.error || e.message)}`);
});

window.addEventListener("unhandledrejection", (e) => {
	console.error("Unhandled rejection:", e.reason);
	showErrorOverlay(`Unhandled rejection:\n${String((e as any).reason)}`);
});

try {
	// Configure API client base URL from Vite environment variable.
	// When VITE_API_URL is not set, leave base URL null so relative paths are used.
	// This lets the frontend call the same origin (/api) when the backend is hosted together.
	// Vite exposes env vars prefixed with VITE_ via import.meta.env.
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore - import.meta is defined by Vite at build time
		const apiUrl = (import.meta as any).env?.VITE_API_URL || null;
		setBaseUrl(apiUrl);
		console.info("api-client baseUrl=", apiUrl);
	} catch (e) {
		// ignore in non-Vite environments
	}

	createRoot(document.getElementById("root")!).render(<App />);
} catch (err) {
	console.error("Render error:", err);
	showErrorOverlay(`Render error:\n${String(err)}`);
}
