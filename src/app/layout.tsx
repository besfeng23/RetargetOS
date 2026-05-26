import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RetargetOS",
  description: "Phase 1 first-party data activation foundation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
