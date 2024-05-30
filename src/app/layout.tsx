import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Nearest Finder",
  description: "Find the closest country to your current location",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body className="leading-normal tracking-normal text-gray-900">
        {children}
      </body>
    </html>
  );
}
