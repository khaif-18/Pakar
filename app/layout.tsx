import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "E-Bengkel | Sistem Pakar Otomotif",
    template: "%s | E-Bengkel",
  },
  description:
    "Sistem pakar berbasis Certainty Factor untuk menentukan level support layanan bengkel otomotif yang tepat sesuai kondisi kendaraan Anda.",
  keywords: ["sistem pakar", "bengkel", "otomotif", "certainty factor", "konsultasi kendaraan", "CF method"],
  authors: [{ name: "E-Bengkel Team" }],
  creator: "E-Bengkel Team",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "E-Bengkel",
    title: "E-Bengkel | Sistem Pakar Otomotif",
    description:
      "Temukan level support kendaraanmu dengan metode Certainty Factor. 13 rules IF-THEN, 5 level rekomendasi, hasil instan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Bengkel | Sistem Pakar Otomotif",
    description:
      "Temukan level support kendaraanmu dengan metode Certainty Factor. 13 rules IF-THEN, 5 level rekomendasi, hasil instan.",
  },
  metadataBase: new URL("https://e-bengkel.vercel.app"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen antialiased bg-brand-900 text-brand-50">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
