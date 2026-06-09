import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "E-Bengkel — Sistem Pakar Otomotif",
    short_name: "E-Bengkel",
    description:
      "Sistem pakar berbasis Certainty Factor untuk rekomendasi level layanan bengkel otomotif.",
    start_url: "/",
    display: "standalone",
    background_color: "#070d15",
    theme_color: "#f59e0b",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
