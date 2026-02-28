import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Will AI Replace Me? — Career Risk Assessment",
  description: "Enter your job title. Get a brutally honest AI replacement assessment.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
