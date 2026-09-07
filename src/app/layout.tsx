import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neura — Adaptive Education for Neurodivergent Minds",
  description:
    "An AI-powered learning environment that personalizes explanation styles, pacing, and visual scaffolding in real-time. No timers, no red marks, no cognitive overwhelm.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-body bg-white text-slate-800">
        {children}
      </body>
    </html>
  );
}
