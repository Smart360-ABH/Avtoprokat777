import { Link } from "wouter";

const phone = "+7 (940) 993-84-97";
const phoneHref = "tel:+79409938497";
const whatsapp = "https://wa.me/79409938497";
const telegram = "https://t.me/autopro777";

export default function Footer() {
  return (
    <footer id="contacts" style={{ background: "#0d1a3e", color: "#f7f4ef" }}>
      {/* Top contact bar */}
      <div style={{ borderBottom: "1px solid rgba(184,137,42,0.15)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Phone */}
            <div>
              <div
                className="text-xs tracking-widest uppercase mb-2 font-light"
                style={{ color: "rgba(194,194,198,0.4)", letterSpacing: "0.2em" }}
              >
                Звоните нам
              </div>
              <a
                href={phoneHref}
                className="font-serif text-xl font-light transition-colors duration-300"
                style={{ color: "#c9a040" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#e8c96a")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#c9a040")}
              >
                {phone}
              </a>
            </div>

            {/* Messengers — minimal platinum style */}
            <div className="flex gap-4 md:justify-center">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs tracking-widest uppercase py-2.5 px-5 transition-all duration-300"
                style={{
                  border: "1px solid rgba(194,194,198,0.2)",
                  color: "rgba(194,194,198,0.6)",
                  letterSpacing: "0.1em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(184,137,42,0.5)";
                  (e.currentTarget as HTMLElement).style.color = "#c9a040";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(194,194,198,0.2)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(194,194,198,0.6)";
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a
                href={telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs tracking-widest uppercase py-2.5 px-5 transition-all duration-300"
                style={{
                  border: "1px solid rgba(194,194,198,0.2)",
                  color: "rgba(194,194,198,0.6)",
                  letterSpacing: "0.1em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(184,137,42,0.5)";
                  (e.currentTarget as HTMLElement).style.color = "#c9a040";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(194,194,198,0.2)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(194,194,198,0.6)";
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Telegram
              </a>
            </div>

            {/* CTA */}
            <div className="md:text-right">
              <Link href="/booking" className="btn-luxury px-8 py-3.5 rounded-sm inline-block">
                Оставить заявку
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 w-fit">
              <img src="/logo.jpeg" alt="Автопрокат 777" className="w-10 h-10 rounded-full object-cover ring-1 ring-yellow-600/30" />
              <span className="font-serif font-bold text-lg" style={{ color: "#c9a040" }}>
                Автопрокат 777
              </span>
            </Link>
            <p className="text-sm font-light leading-relaxed max-w-xs mb-6" style={{ color: "rgba(194,194,198,0.45)" }}>
              Премиальная аренда автомобилей в Абхазии. Три точки выдачи — Новый Афон, Гагра, Гудаута.
            </p>
            <div className="text-xs tracking-widest uppercase font-light" style={{ color: "rgba(194,194,198,0.3)", letterSpacing: "0.15em" }}>
              Ежедневно · 08:00 — 21:00
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-5 font-light" style={{ color: "#b8892a", letterSpacing: "0.2em" }}>
              Страницы
            </h4>
            <ul className="space-y-3">
              {[["Главная", "/"], ["Гараж", "/garage"], ["Автопарк", "/catalog"], ["Филиалы", "/branches"], ["Аренда", "/booking"]].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="text-xs tracking-wide font-light transition-colors duration-300"
                    style={{ color: "rgba(194,194,198,0.4)", letterSpacing: "0.05em" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c9a040")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(194,194,198,0.4)")}
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-5 font-light" style={{ color: "#b8892a", letterSpacing: "0.2em" }}>
              Филиалы
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Новый Афон", addr: "ул. Харазия" },
                { name: "Гагра", addr: "ул. Адыгаа" },
                { name: "Гудаута", addr: "ул. Маргания, 3" },
              ].map((b) => (
                <li key={b.name}>
                  <div className="text-xs font-medium" style={{ color: "rgba(247,244,239,0.6)" }}>{b.name}</div>
                  <div className="text-xs font-light mt-0.5" style={{ color: "rgba(194,194,198,0.35)" }}>{b.addr}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-between gap-4 pt-8 text-xs font-light"
          style={{ borderTop: "1px solid rgba(184,137,42,0.1)", color: "rgba(194,194,198,0.25)", letterSpacing: "0.05em" }}
        >
          <div>© 2024 Автопрокат 777. Все права защищены.</div>
          <div>ИП [Наименование] · ИНН [000000000000]</div>
        </div>
      </div>
    </footer>
  );
}
