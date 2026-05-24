import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

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
	createRoot(document.getElementById("root")!).render(<App />);
} catch (err) {
	console.error("Render error:", err);
	showErrorOverlay(`Render error:\n${String(err)}`);
}
