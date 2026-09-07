import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const footerLinks = [
  "Accessibility Statement",
  "Sensory Settings",
  "Privacy & Non-Diagnostic Guarantee",
  "Research & Pedagogy",
  "Help Center",
];

export function SiteFooter() {
  return (
    <footer className="border-t border-sky-100 bg-sky-50 px-4 pb-12 pt-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-sky-100 pb-8 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-heading text-xl font-medium text-sky-600">
                Neura
              </span>
              <span className="font-body text-slate-500">•</span>
              <span className="font-body text-base text-slate-700">
                Supportive learning designed for diverse minds.
              </span>
            </div>
            <p className="font-heading text-xs font-medium text-slate-500">
              Built with cognitive preservation and joyful mastery at its
              heart.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="font-heading text-sm font-medium text-slate-700 transition-colors hover:text-sky-600"
              >
                {link}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-heading text-xs font-medium text-slate-500">
            © {new Date().getFullYear()} Neura Education Inc. All rights
            reserved.
          </p>
          <p className="flex items-center gap-2 font-heading text-xs font-medium text-slate-500">
            <ShieldCheck className="size-4 text-sky-600" />
            Adheres to WCAG 2.1 AAA Accessibility Guidelines
          </p>
        </div>
      </div>
    </footer>
  );
}
