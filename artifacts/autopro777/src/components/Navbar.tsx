import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const phone = "+7 (940) 993-84-97";
const phoneHref = "tel:+79409938497";

const navLinks = [
  { label: "Главная", href: "/" },
  { label: "Гараж", href: "/garage" },
  { label: "Автопарк", href: "/catalog" },
  { label: "Филиалы", href: "/branches" },
  { label: "Аренда", href: "/booking" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); window.scrollTo({ top: 0 }); }, [location]);

  const transparent = isHome && !scrolled;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: transparent
          ? "transparent"
          : "rgba(9, 12, 20, 0.96)",
        backdropFilter: transparent ? "none" : "blur(20px) saturate(180%)",
        borderBottom: transparent ? "none" : "1px solid rgba(184,137,42,0.12)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.jpeg"
              alt="Автопрокат 777"
              className="w-10 h-10 rounded-full object-cover ring-1 ring-yellow-600/40 group-hover:ring-yellow-500/70 transition-all duration-300"
            />
            <span
              className="font-serif font-bold text-lg tracking-wide transition-colors duration-300"
              style={{
                color: transparent ? "#f7f4ef" : "#c9a040",
                textShadow: transparent ? "0 1px 20px rgba(0,0,0,0.5)" : "none",
              }}
            >
              Автопрокат <span style={{ color: "#b8892a" }}>777</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center">
            {navLinks.map((l, i) => {
              const active = location === l.href;
              return (
                <div key={l.href} className="flex items-center">
                  {i > 0 && (
                    <div
                      className="w-px h-3 mx-1"
                      style={{ background: "rgba(184,137,42,0.25)" }}
                    />
                  )}
                  <Link
                    href={l.href}
                    className="px-4 py-2 text-xs font-medium tracking-widest uppercase transition-all duration-300"
                    style={{
                      color: active
                        ? "#c9a040"
                        : transparent
                        ? "rgba(247,244,239,0.7)"
                        : "rgba(247,244,239,0.55)",
                      letterSpacing: "0.1em",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.color = "#c9a040";
                    }}
                    onMouseLeave={(e) => {
                      if (!active)
                        (e.currentTarget as HTMLElement).style.color = transparent
                          ? "rgba(247,244,239,0.7)"
                          : "rgba(247,244,239,0.55)";
                    }}
                  >
                    {l.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* CTA right */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href={phoneHref}
              className="text-xs tracking-widest uppercase transition-colors duration-300"
              style={{ color: transparent ? "rgba(247,244,239,0.65)" : "rgba(194,194,198,0.7)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c9a040")}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = transparent
                  ? "rgba(247,244,239,0.65)"
                  : "rgba(194,194,198,0.7)")
              }
            >
              {phone}
            </a>
            <Link
              href="/booking"
              className="btn-luxury px-5 py-2.5 rounded-sm"
            >
              Заявка
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden p-2"
            onClick={() => setOpen(!open)}
            style={{ color: transparent ? "#f7f4ef" : "#c9a040" }}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-px bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden transition-all duration-400 overflow-hidden"
        style={{
          maxHeight: open ? "500px" : "0",
          background: "rgba(9,12,20,0.98)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(184,137,42,0.1)",
        }}
      >
        <div className="px-6 py-5 flex flex-col gap-0.5">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="py-3 text-xs tracking-widest uppercase transition-colors"
              style={{
                color: location === l.href ? "#c9a040" : "rgba(247,244,239,0.55)",
                borderBottom: "1px solid rgba(184,137,42,0.08)",
              }}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <a href={phoneHref} className="text-xs tracking-widest" style={{ color: "#c2c2c6" }}>
              {phone}
            </a>
            <Link href="/booking" className="btn-luxury px-5 py-3 rounded-sm text-center block">
              Оставить заявку
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
