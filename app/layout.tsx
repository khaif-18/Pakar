import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "E-Bengkel | Sistem Pakar Otomotif",
  description:
    "Sistem pakar berbasis Certainty Factor untuk menentukan level support layanan bengkel otomotif yang tepat sesuai kondisi kendaraan Anda.",
  keywords: "sistem pakar, bengkel, otomotif, certainty factor, konsultasi kendaraan",
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
