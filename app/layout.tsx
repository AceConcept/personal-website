import type { Metadata } from "next";
import "./globals.css";
import { REEL_PRELOAD_URLS } from "./lib/reel-data";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "WEB SITE Section",
  description: "yui540-style WEB SITE section",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {REEL_PRELOAD_URLS.map((url) => (
          <link key={url} rel="preload" as="image" href={url} />
        ))}
      </head>
      <body>
        <Navbar />
        {children}
        <footer className="siteFooter" />
      </body>
    </html>
  );
}
