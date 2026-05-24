import { Link } from "wouter";
import heroBg from "@/assets/hero-bg.png";

const phoneHref = "tel:+79409938497";

const editorialCards = [
  {
    label: "Премиум детейлинг",
    sub: "Перед каждой выдачей",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 15a6 6 0 0011.659-1.5M6.5 9a5.5 5.5 0 0110.832 0" />
      </svg>
    ),
  },
  {
    label: "Консьерж-сервис",
    sub: "Ответ в течение 15 минут",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Три точки выдачи",
    sub: "Новый Афон · Гагра · Гудаута",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background — cinematic grade */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Абхазия"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.55) saturate(0.85) sepia(0.15)" }}
        />
        {/* Cinematic gradient — warm golden vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 100%, rgba(9,12,20,0.9) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 50% 0%, rgba(9,12,20,0.6) 0%, transparent 50%),
              linear-gradient(180deg, rgba(9,12,20,0.5) 0%, rgba(9,12,20,0.2) 40%, rgba(9,12,20,0.7) 100%)
            `,
          }}
        />
        {/* Subtle warm gold cast */}
        <div
          className="absolute inset-0 opacity-15"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(184,137,42,0.4) 0%, transparent 70%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 text-center">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="gold-divider" />
          <span
            className="text-xs tracking-widest uppercase font-light"
            style={{ color: "rgba(184,137,42,0.9)", letterSpacing: "0.25em" }}
          >
            Абхазия · Премиальный автопрокат
          </span>
          <div className="gold-divider" />
        </div>

        {/* Main title */}
        <h1
          className="font-serif font-bold leading-none mb-6"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 7rem)",
            color: "transparent",
            backgroundImage: "linear-gradient(135deg, #c9a040 0%, #e8c96a 35%, #b8892a 60%, #d4a84b 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.01em",
          }}
        >
          Автопрокат 777
        </h1>

        {/* Tagline */}
        <p
          className="font-serif font-light mb-3 max-w-xl mx-auto"
          style={{
            fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)",
            color: "#f7f4ef",
            letterSpacing: "0.01em",
            lineHeight: 1.4,
          }}
        >
          Опыт Абхазии в исключительной роскоши
        </p>
        <p
          className="font-light mb-14 max-w-md mx-auto text-sm tracking-wide"
          style={{ color: "rgba(194,194,198,0.6)", letterSpacing: "0.05em" }}
        >
          Безупречный сервис · Проверенные автомобили · Прозрачные условия
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link href="/booking" className="btn-luxury px-10 py-4 rounded-sm">
            Оставить заявку
          </Link>
          <a
            href={phoneHref}
            className="btn-outline-platinum px-10 py-4 rounded-sm inline-flex items-center justify-center gap-2.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +7 (940) 993-84-97
          </a>
        </div>

        {/* Editorial cards — replace old stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px max-w-2xl mx-auto"
          style={{ background: "rgba(184,137,42,0.15)", borderRadius: "2px" }}>
          {editorialCards.map((c, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 py-5 px-4"
              style={{ background: "rgba(9,12,20,0.6)", backdropFilter: "blur(10px)" }}
            >
              <div style={{ color: "#b8892a" }}>{c.icon}</div>
              <div className="font-serif text-sm font-medium" style={{ color: "#f7f4ef" }}>{c.label}</div>
              <div className="text-xs tracking-wide" style={{ color: "rgba(194,194,198,0.5)" }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div
          className="w-px h-12 animate-pulse"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(184,137,42,0.6), transparent)" }}
        />
      </div>
    </section>
  );
}
