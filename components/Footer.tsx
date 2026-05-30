import Link from "next/link";
import { Wrench, ExternalLink, Mail, MessageCircle } from "lucide-react";

const team = [
  "Muhammad Khalifah Erian",
  "Jerrel Adriel Archibald Hutahaean",
  "Muhammad Noufal Rifqi Iman",
  "Iqbal Fanosa Wiotama",
  "Pahriza Andresta",
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-700/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                <Wrench size={18} className="text-white" />
              </div>
              <div>
                <p className="text-brand-50 font-bold text-sm">E-Bengkel</p>
                <p className="text-brand-300 text-[10px] uppercase tracking-wider">Sistem Pakar</p>
              </div>
            </div>
            <p className="text-brand-300 text-sm leading-relaxed max-w-xs">
              Sistem pakar berbasis Certainty Factor untuk menentukan level support
              layanan otomotif yang tepat sesuai kondisi Anda.
            </p>
            <div className="flex gap-3">
              <a
                href="mailto:support@ebengkel.id"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-brand-300 hover:text-brand-100 transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-brand-300 hover:text-brand-100 transition-all duration-200"
                aria-label="Discord"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-brand-300 hover:text-brand-100 transition-all duration-200"
                aria-label="GitHub"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-brand-50 font-semibold text-sm uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Beranda" },
                { href: "/konsultasi", label: "Konsultasi" },
                { href: "/knowledge-base", label: "Knowledge Base" },
                { href: "/history", label: "Riwayat Konsultasi" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-brand-300 hover:text-brand-100 text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div className="space-y-4">
            <h3 className="text-brand-50 font-semibold text-sm uppercase tracking-wider">Tim Pengembang</h3>
            <ul className="space-y-1.5">
              {team.map((name) => (
                <li key={name} className="text-brand-300 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-brand-400 text-xs">
            © {new Date().getFullYear()} E-Bengkel Sistem Pakar. All rights reserved.
          </p>
          <p className="text-brand-400 text-xs">
            Dibangun dengan Next.js 14 · Certainty Factor Theory
          </p>
        </div>
      </div>
    </footer>
  );
}
