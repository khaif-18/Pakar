# E-Bengkel — Sistem Pakar Otomotif

Aplikasi web sistem pakar untuk menentukan **level support layanan bengkel** yang tepat berdasarkan kondisi pelanggan dan kendaraan. Dibangun menggunakan metode **Certainty Factor (CF)** untuk menangani ketidakpastian dalam proses pengambilan keputusan.

---

## Tentang Aplikasi

E-Bengkel membantu pelanggan bengkel otomotif untuk mengetahui jenis layanan yang paling sesuai dengan situasi mereka, cukup dengan menjawab beberapa pertanyaan sederhana.

### Cara Kerja

Sistem menganalisis 3 faktor utama menggunakan 13 rule IF-THEN:

1. **Status Keanggotaan** — apakah pelanggan terdaftar sebagai member dan memiliki ID langganan
2. **Tipe Kasus** — kasus baru, lanjutan, atau hanya permintaan informasi
3. **Kondisi Kendaraan** — ada tidaknya kerusakan di dalam atau luar kendaraan

Setiap jawaban memiliki **tingkat keyakinan (9 skala CF)** mulai dari *Sangat Yakin* (+1.0) hingga *Sangat Tidak Yakin* (−1.0). Nilai akhir dihitung dengan formula:

```
CF_final = min(CF_member, CF_kasus, CF_kerusakan) × CF_rule
```

### Output Rekomendasi

| Level | Keterangan |
|---|---|
| **Level High Support** | Prioritas tertinggi, ditangani teknisi senior |
| **Level Medium Support** | Layanan premium untuk member baru |
| **Level Standard Support** | Penanganan standar untuk kasus lanjutan |
| **Information Other** | Permintaan informasi umum |
| **Non Member Support** | Layanan dasar untuk non-member |

### Fitur Aplikasi

- **Konsultasi Wizard** — form 4 langkah dengan animasi transisi dan progress bar
- **Hasil Analitik** — gauge chart Certainty Factor + breakdown chart per faktor
- **Knowledge Base** — tampilan visual seluruh 13 rule IF-THEN, dapat difilter per kategori
- **Riwayat Konsultasi** — histori tersimpan di browser, dilengkapi pencarian, sort, dan export JSON
- **Responsif** — tampilan mobile-friendly di semua ukuran layar

### Halaman

| Route | Halaman |
|---|---|
| `/` | Landing page |
| `/konsultasi` | Wizard konsultasi 4 langkah |
| `/hasil` | Hasil rekomendasi + chart analytics |
| `/knowledge-base` | Basis pengetahuan sistem |
| `/history` | Riwayat konsultasi |

### Tim Pengembang

- Iqbal Fanosa Wiotama
- Jerrel Adriel Archibald Hutahaean
- Muhammad Khalifah Erian
- Muhammad Noufal Rifqi Iman
- Pahriza Andresta

---

## Pengembangan

### Tech Stack

| Kategori | Teknologi | Versi |
|---|---|---|
| Framework | [Next.js](https://nextjs.org) | 14.x |
| Language | TypeScript | 5.x |
| Styling | [Tailwind CSS](https://tailwindcss.com) | 3.x |
| Animasi | [Framer Motion](https://www.framer.com/motion) | 12.x |
| Chart | [Recharts](https://recharts.org) | 3.x |
| State Management | [Zustand](https://zustand-demo.pmnd.rs) | 5.x |
| Icons | [Lucide React](https://lucide.dev) | latest |
| Utilities | clsx, tailwind-merge | latest |

### Prasyarat

Pastikan sudah terinstal di mesin lokal:

- [Node.js](https://nodejs.org) v18 atau lebih baru
- npm v9+

### Setup & Menjalankan

```bash
# 1. Clone repository
git clone <repo-url>
cd pakar

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Scripts

```bash
npm run dev      # Development server dengan hot-reload
npm run build    # Build production
npm run start    # Jalankan build production
npm run lint     # Cek linting (ESLint)
```

### Struktur Proyek

```
pakar/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (Navbar + Footer)
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Global styles + Tailwind directives
│   ├── konsultasi/page.tsx     # Wizard konsultasi 4 langkah
│   ├── hasil/page.tsx          # Halaman hasil + chart
│   ├── knowledge-base/page.tsx # Knowledge base viewer
│   └── history/page.tsx        # Riwayat konsultasi
│
├── components/
│   ├── Navbar.tsx              # Navigasi global (sticky, responsive)
│   ├── Footer.tsx              # Footer dengan info tim
│   └── ConfidenceSelector.tsx  # Komponen pemilih tingkat keyakinan
│
├── lib/
│   ├── types.ts                # TypeScript interfaces & types
│   ├── expertSystem.ts         # Engine CF: rules, kalkulasi, knowledge base
│   ├── store.ts                # Zustand store (form state + history)
│   └── utils.ts                # Helper functions (cn, formatCF, formatDate)
│
├── tailwind.config.ts          # Konfigurasi warna & animasi kustom
├── next.config.mjs             # Konfigurasi Next.js
└── tsconfig.json               # Konfigurasi TypeScript
```

### Konfigurasi Warna

Palet warna E-Bengkel didefinisikan di `tailwind.config.ts`:

```ts
colors: {
  primary:   "#b1d4e8",   // Biru muda — teks highlight, aksen
  secondary: "#5b8ab1",   // Biru sedang — tombol, link aktif
  brand: {
    600:     "#2a5b84",   // Background utama
    700:     "#1e4568",   // Background card / section
    ...
  }
}
```

### Menambahkan Rule Baru

Semua rule IF-THEN ada di [`lib/expertSystem.ts`](lib/expertSystem.ts). Untuk menambahkan rule baru:

1. Tambahkan entry ke array `KNOWLEDGE_BASE_RULES` dengan properti `id`, `condition`, `result`, `cfRule`, `formula`, `category`, dan `description`
2. Update fungsi `runExpertSystem()` dengan logika kalkulasi CF yang sesuai
3. Jika ada output level baru, tambahkan ke type `SupportLevel` di [`lib/types.ts`](lib/types.ts) beserta metadata-nya di `SUPPORT_LEVEL_META`
