import Link from "next/link";
import { User } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works", active: true },
  { label: "Multimodal Learning", href: "#multimodal-learning" },
  { label: "Features", href: "#features" },
  { label: "Accessibility", href: "#accessibility" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex w-full justify-center border-b border-transparent bg-white/90 px-4 shadow-[0_1px_8px_0_rgba(0,0,0,0.04)] backdrop-blur-md sm:px-8">
      <div className="flex h-20 w-full max-w-6xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="#top"
            className="font-heading text-xl font-medium tracking-tight text-sky-600"
          >
            Neura
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={
                  link.active
                    ? "font-body py-2 text-base font-bold text-sky-600"
                    : "font-heading py-2 text-sm font-medium text-slate-700 transition-colors hover:text-sky-600"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="#login"
            className="hidden p-2 font-heading text-sm font-medium text-slate-700 transition-colors hover:text-sky-600 sm:inline-block"
          >
            Log In
          </Link>
          <Link
            href="#start"
            className="rounded-full bg-sky-500 px-4 py-2.5 font-heading text-sm font-medium text-white shadow-[0_4px_8px_rgba(14,165,233,0.3)] transition-transform hover:scale-[1.02]"
          >
            Start Learning
          </Link>
          <Link
            href="#profile"
            aria-label="Profile"
            className="flex size-8 items-center justify-center rounded-full bg-sky-700 text-white transition-colors hover:bg-sky-800"
          >
            <User className="size-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
