import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MetalSense AI | Hindustan Zinc Limited (HZL)",
  description: "Enterprise Domestic Demand Sensing & Commercial Optimization Platform covering Zinc, Lead, Silver, and Cadmium for Vedanta / HZL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
